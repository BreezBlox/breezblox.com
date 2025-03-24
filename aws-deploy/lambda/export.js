/**
 * AWS Lambda function to generate CSV exports of issue data
 */

/**
 * Convert array of issues to CSV format
 * @param {Array} issues - Array of issue objects
 * @returns {string} - CSV formatted string
 */
function convertToCSV(issues) {
  const headers = [
    'Date', 'Job Number', 'Part Number', 'Department Discovered', 
    'Root Department', 'Description', 'Delay (hrs)', 'QC Checkpoint', 'Contested'
  ];
  
  const rows = issues.map(issue => [
    issue.date || '',
    issue.jobNumber || '',
    issue.partNumber || '',
    issue.department || '',
    issue.rootDepartment || '',
    // Escape quotes in description text
    issue.description ? `"${issue.description.replace(/"/g, '""')}"` : '',
    issue.delayTime || '0',
    issue.isQcCheckpoint ? 'Yes' : 'No',
    issue.contested ? 'Yes' : 'No'
  ]);
  
  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}

/**
 * Generate a presigned URL for an S3 object
 * @param {string} bucket - S3 bucket name
 * @param {string} key - S3 object key
 * @param {number} expiresIn - URL expiration time in seconds
 * @returns {Promise<string>} - Presigned URL
 */
function generatePresignedUrl(bucket, key, expiresIn = 3600) {
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3();
  
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: expiresIn
  };
  
  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
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
    if (!requestBody.issues || !Array.isArray(requestBody.issues)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid request', 
          message: 'Issues array is required' 
        })
      };
    }
    
    const { issues } = requestBody;
    
    // Convert issues to CSV format
    const csvData = convertToCSV(issues);
    
    // For direct download with API Gateway
    if (requestBody.directResponse) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="prism_issues_${new Date().toISOString().split('T')[0]}.csv"`,
          'Access-Control-Allow-Origin': '*'
        },
        body: csvData,
        isBase64Encoded: false
      };
    }
    
    // For S3 storage with presigned URL
    if (requestBody.useS3) {
      const AWS = require('aws-sdk');
      const s3 = new AWS.S3();
      
      const bucket = process.env.EXPORT_BUCKET || 'prism-app-exports';
      const key = `exports/${Date.now()}_prism_issues.csv`;
      
      await s3.putObject({
        Bucket: bucket,
        Key: key,
        Body: csvData,
        ContentType: 'text/csv',
        ContentDisposition: `attachment; filename="prism_issues_${new Date().toISOString().split('T')[0]}.csv"`
      }).promise();
      
      const downloadUrl = await generatePresignedUrl(bucket, key);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'Export successful',
          downloadUrl,
          expiresIn: '1 hour'
        })
      };
    }
    
    // Default response with CSV data
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Export successful',
        data: csvData
      })
    };
    
  } catch (error) {
    console.error('Error processing export request:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Export failed', 
        message: error.message 
      })
    };
  }
}; 