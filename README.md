# RatTracker: Boston Rat Sightings Web Application

RatTracker is a community-driven web application that allows residents to report rat sightings across Boston and view aggregated data in the form of a heatmap. The project combines a modern serverless architecture with an intuitive frontend, creating a scalable and low-maintenance solution for public health monitoring and civic engagement. This project is primarily deployed on AWS. For local development, the frontend can be served locally, but backend functions rely on cloud infrastructure.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Deployment Workflow](#deployment-workflow)
- [API Overview](#api-overview)
- [Future Improvements](#future-improvements)

## Features
- Submit and record real-time rat sightings in Boston
- View an interactive heatmap of all reported locations
- Scalable serverless backend powered by AWS Lambda and DynamoDB
- Frontend hosted and continuously deployed with AWS Amplify

## Architecture

The application follows a serverless, event-driven architecture using AWS services:

![aws-rat](https://github.com/boydlm/RatTracker/assets/114845124/91b71a12-5548-44ac-9070-92fa6343a214)

1. **Frontend**: Built with HTML, CSS, and JavaScript, hosted via AWS Amplify
2. **Route 53**: Custom domain routing to the Amplify-hosted frontend
3. **API Gateway**: Entry point for API requests from the frontend
4. **Lambda Functions**: Handle business logic and interact with the database
5. **DynamoDB**: Stores all rat sighting records in a scalable NoSQL format
6. **GitHub + Amplify**: Automatic CI/CD deployment pipeline

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: AWS Lambda, API Gateway
- **Database**: AWS DynamoDB (NoSQL)
- **Hosting & CI/CD**: AWS Amplify
- **Domain Management**: AWS Route 53

## Deployment Workflow

1. Developer pushes code to GitHub repository
2. AWS Amplify detects changes and triggers the CI/CD pipeline
3. The frontend is built and deployed to a public URL
4. Users access the app, submit sightings, and view the heatmap
5. API Gateway forwards requests to Lambda functions
6. Lambda functions validate and store data in DynamoDB

## API Overview

### POST /sightings
Submit a new rat sighting.

**Request Body:**
```json
{
  "location": {
    "latitude": 42.3601,
    "longitude": -71.0589
  },
  "description": "Saw three rats near the dumpster behind 7-Eleven.",
  "timestamp": "2025-07-02T18:45:00Z"
}
```

### GET /sightings
Returns a list of all recent rat sightings for heatmap rendering.

**Response:**
```json
[
  {
    "latitude": 42.3601,
    "longitude": -71.0589,
    "count": 1
  }
]
```

## Future Improvements
- User authentication using AWS Cognito
- Image uploads with S3 integration
- Admin moderation panel
- Public health dashboard for city officials
- Time-based heatmap filtering
