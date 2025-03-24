/**
 * AWS Lambda function to analyze issue descriptions and determine
 * the responsible department using the Mistral API
 */

const https = require('https');

// Get API key from environment variable
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const API_URL = 'api.mistral.ai';

// List of valid departments
const VALID_DEPARTMENTS = [
  "Supply Chain", "Engineering", "Metal Shop", "Pre-Assembly", 
  "Bodywork", "Paint", "Sign-Shop", "Final Assembly"
];

/**
 * Helper function to make HTTP requests
 * @param {Object} options - Request options
 * @param {Object} data - Request body
 * @returns {Promise<Object>} - Response data
 */
function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          if (res.statusCode >= 400) {
            reject(new Error(`API Error: ${parsedData.error?.message || 'Unknown error'}`));
          } else {
            resolve(parsedData);
          }
        } catch (err) {
          reject(new Error(`Failed to parse response: ${err.message}`));
        }
      });
    });
    
    req.on('error', (err) => {
      reject(new Error(`Request failed: ${err.message}`));
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

/**
 * Analyze issue with Mistral API
 * @param {Object} issueData - The issue data
 * @returns {Promise<string>} - The determined department
 */
async function analyzeIssueWithMistral(issueData) {
  if (!MISTRAL_API_KEY) {
    throw new Error('MISTRAL_API_KEY environment variable is not set');
  }
  
  const { description, department, jobNumber, partNumber, isQcCheckpoint } = issueData;
  
  // Create a prompt that helps the LLM understand the task
  const systemPrompt = `You are a production issue analysis system that determines which department is responsible for production issues. 
  Based on the issue description, determine which department is most likely the root cause of the issue.
  Only respond with one of these department names: "Supply Chain", "Engineering", "Metal Shop", "Pre-Assembly", "Bodywork", "Paint", "Sign-Shop", "Final Assembly".
  Do not include any explanations, just the department name.`;
  
  const userPrompt = `Issue Details:
  - Description: ${description}
  - Discovered in Department: ${department}
  - Job Number: ${jobNumber}
  ${partNumber ? `- Part Number: ${partNumber}` : ''}
  ${isQcCheckpoint ? '- Found during QC Checkpoint' : ''}
  
  Which department is responsible for this issue?`;
  
  const requestData = {
    model: 'mistral-small-latest',
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: userPrompt
      }
    ],
    temperature: 0.2,
    max_tokens: 10
  };
  
  const options = {
    hostname: API_URL,
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MISTRAL_API_KEY}`
    }
  };
  
  try {
    const response = await makeRequest(options, requestData);
    const departmentResponse = response.choices[0].message.content.trim();
    
    // Validate that the response is one of our allowed departments
    return VALID_DEPARTMENTS.includes(departmentResponse) 
      ? departmentResponse 
      : department;
  } catch (error) {
    console.error('Error calling Mistral API:', error);
    // Fallback to the department where it was discovered if API fails
    return department;
  }
}

/**
 * Fallback function when API is not available
 * @param {Object} issueData - The issue data
 * @returns {string} - A department name
 */
function analyzeIssueLocal(issueData) {
  const { description = '', department } = issueData;
  const lowerDesc = description.toLowerCase();
  
  // Simple keyword matching - this is just a fallback
  if (lowerDesc.includes('drawing') || lowerDesc.includes('design') || lowerDesc.includes('spec')) {
    return 'Engineering';
  } else if (lowerDesc.includes('material') || lowerDesc.includes('delivery') || lowerDesc.includes('order')) {
    return 'Supply Chain';
  } else if (lowerDesc.includes('welding') || lowerDesc.includes('cut') || lowerDesc.includes('fab')) {
    return 'Metal Shop';
  } else if (lowerDesc.includes('paint') || lowerDesc.includes('finish') || lowerDesc.includes('color')) {
    return 'Paint';
  } else if (lowerDesc.includes('assembly') || lowerDesc.includes('install') || lowerDesc.includes('mount')) {
    return 'Final Assembly';
  } else if (lowerDesc.includes('body') || lowerDesc.includes('panel') || lowerDesc.includes('fitment')) {
    return 'Bodywork';
  } else if (lowerDesc.includes('graphics') || lowerDesc.includes('logo') || lowerDesc.includes('sign')) {
    return 'Sign-Shop';
  } else if (lowerDesc.includes('part') || lowerDesc.includes('component') || lowerDesc.includes('sub')) {
    return 'Pre-Assembly';
  }
  
  // If no keywords match, return the department where it was found
  return department;
}

/**
 * Lambda handler function
 * @param {Object} event - Lambda event
 * @param {Object} context - Lambda context
 * @returns {Promise<Object>} - Response
 */
exports.handler = async (event, context) => {
  // Set default headers for CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight response' })
    };
  }
  
  try {
    // Parse the request body
    const requestBody = JSON.parse(event.body || '{}');
    
    // Validate the request
    if (!requestBody.description || !requestBody.department || !requestBody.jobNumber) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields', 
          message: 'Description, department, and jobNumber are required' 
        })
      };
    }
    
    // Determine which analysis method to use
    let rootDepartment;
    if (MISTRAL_API_KEY) {
      rootDepartment = await analyzeIssueWithMistral(requestBody);
    } else {
      rootDepartment = analyzeIssueLocal(requestBody);
    }
    
    // Return the result
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        rootDepartment,
        jobNumber: requestBody.jobNumber,
        usedAI: !!MISTRAL_API_KEY
      })
    };
  } catch (error) {
    console.error('Error processing request:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message 
      })
    };
  }
}; 