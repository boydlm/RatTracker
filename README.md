# RatTracker

## Architecture
![awsrat](https://github.com/boydlm/RatTracker/assets/114845124/8b6f17c9-78ff-4e68-a499-19877c40c8c3)

### Boston RatTracker utilizes various AWS technologies creating a robust backend infrastructure. 

## AWS Amplify 
AWS Amplify offers a fully managed CI/CD and hosting service. In using Amplify, any code changes the developer makes are automatically deployed. See [AWS Amplify](https://aws.amazon.com/amplify/?nc=sn&loc=0) for more details. 

## API Gateway 
AWS API Gateway is a data-plane entry point for API calls that represent client requests to target applications and services. See [AWS API Gateway](https://docs.aws.amazon.com/apigateway/) for more details.

## Lambda
AWS Lambda is a compute service that lets you run code without provisioning or managing servers. See [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) for more details. API Gateway triggers the lambda functions which in turn executes a DynamoDB Query.

## AWS DynamoDB 
AWS DynamoDB is a fully managed NoSQL database server that offers seamless scalability. See [AWS DynamoDB](https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html) for more details.