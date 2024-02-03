# RatTracker
Boston RatTracker is a community driven web application that allows users to add rat sightings in their Boston area. In displaying a heatmap, it allows users to see at first glance into the amount of rat sightings in their area. It utilizes various AWS technologies creating a robust backend infrastructure. 

## Architecture
![aws-rat](https://github.com/boydlm/RatTracker/assets/114845124/91b71a12-5548-44ac-9070-92fa6343a214)

## AWS Amplify 
A fully-managed CI/CD and hosting service. In using Amplify, any code changes the developer makes are automatically deployed. 

## API Gateway 
The entry-point for API calls that executes functions on Lambda. 

## AWS Lambda
A serverless compute service used to query DynamoDB. 

## AWS DynamoDB 
A fully managed, scalable, NoSQL database used to store rat sightings. 