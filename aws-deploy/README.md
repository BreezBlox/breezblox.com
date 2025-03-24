# PRISM AWS Deployment Guide

This guide provides steps to deploy the PRISM application to AWS, utilizing the Free Tier services.

## Architecture Overview

The application uses the following AWS services:

- **Amazon S3**: Hosts the static website files
- **AWS Lambda**: Processes backend logic
- **API Gateway**: Creates RESTful API endpoints
- **CloudWatch**: Monitors usage and costs

## Prerequisites

1. AWS account with access to S3, Lambda, and API Gateway services
2. AWS CLI installed and configured with your credentials
3. Node.js and npm installed
4. Mistral API key (optional, for enhanced issue analysis)

## Deployment Steps

### 1. Build the React application

```bash
npm run build
```

### 2. Create and configure S3 bucket for static website hosting

```bash
# Create bucket
aws s3api create-bucket --bucket prism-app-beta --region us-east-1

# Configure for website hosting
aws s3 website s3://prism-app-beta --index-document index.html --error-document index.html

# Apply bucket policy for public read access
aws s3api put-bucket-policy --bucket prism-app-beta --policy file://aws-deploy/bucket-policy.json
```

### 3. Upload build files to S3

```bash
aws s3 sync build/ s3://prism-app-beta --acl public-read
```

### 4. Create Lambda Functions

#### Create issue analysis function:

1. Create a new Lambda function in the AWS Console
2. Use Node.js 16.x runtime
3. Set function name to `prism-analyze-issue`
4. Set handler to `analyze.handler`
5. Upload code from `aws-deploy/lambda/analyze.js`
6. Add environment variable for `MISTRAL_API_KEY` (if using)
7. Configure with 128MB memory and 10-second timeout

#### Create export function:

1. Create a new Lambda function in the AWS Console
2. Use Node.js 16.x runtime
3. Set function name to `prism-export-data`
4. Set handler to `export.handler`
5. Upload code from `aws-deploy/lambda/export.js`
6. Set up IAM role with S3 permissions if using S3 for exports
7. Configure with 128MB memory and 10-second timeout

### 5. Set up API Gateway

1. Create a new REST API in API Gateway
2. Configure CORS with the following settings:
   - Allow-Origin: '*' (or your S3 website URL)
   - Allow-Headers: Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token
   - Allow-Methods: GET,POST,OPTIONS
   - Max-Age: 300

3. Create the following resources and methods:
   - `/analyze` (POST): Integrate with `prism-analyze-issue` Lambda
   - `/export` (POST): Integrate with `prism-export-data` Lambda

4. Deploy the API to a new stage named "beta"

### 6. Update frontend configuration

1. Create a `.env.production` file with your API Gateway endpoint:

```
REACT_APP_API_ENDPOINT=https://your-api-id.execute-api.us-east-1.amazonaws.com/beta
```

2. Rebuild the React application
3. Redeploy to S3

## Cost Optimization

To stay within the AWS Free Tier limits:

1. Set up CloudWatch alarms to monitor usage (configured in `deploy-config.js`)
2. Keep Lambda function memory allocations to 128MB
3. Consider implementing usage throttling if needed

## Security Considerations

1. In production, restrict S3 bucket access to specific origins
2. Use AWS IAM best practices for Lambda function permissions
3. Consider adding API key requirements to API Gateway
4. Store sensitive information like API keys in AWS Secrets Manager

## Troubleshooting

- **CORS Issues**: Double check API Gateway CORS configuration
- **Lambda Timeouts**: Monitor and adjust timeout settings as needed
- **S3 Access Issues**: Verify bucket policy allows public read access
- **API Gateway 5xx Errors**: Check Lambda function logs in CloudWatch

## Additional Resources

- [S3 Static Website Hosting Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [API Gateway Documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) 