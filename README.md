# PRISM.beta

**Production Root Issue Sorting Mechanism** - A tool for tracking and analyzing production issues.

![PRISM.beta](public/prism-screenshot.png)

## Overview

PRISM is a lightweight tool that helps teams track production issues and determine which department is responsible for them. It uses AI to automatically classify issues based on their descriptions, making it easier to identify patterns and address root causes.

## Features

- **Issue Submission Form**: Submit production issues with details like job number, department, description, and delay time.
- **AI-Powered Analysis**: Automatically classifies issues to their root department using Mistral AI.
- **Department Visualization**: View issues organized by responsible department with delay time analytics.
- **Interactive Charts**: Bar graph visualization of delay times by department.
- **Contest Mechanism**: Contest AI department assignments with feedback that improves the system over time.
- **Data Export**: Export issue data as CSV for further analysis.
- **Mobile Responsive**: Works on all devices with responsive design.
- **Offline Capable**: Basic functionality works without internet connection.

## Technology Stack

- **Frontend**: React.js
- **AI Integration**: Mistral AI API
- **Deployment**: AWS Free Tier (S3, Lambda, API Gateway)
- **State Management**: React Context API
- **Styling**: Custom CSS with responsive design

## Getting Started

### Prerequisites

- Node.js and npm
- Mistral API key (optional for enhanced AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prism.beta.git
cd prism.beta
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your Mistral API key (optional):
```
REACT_APP_MISTRAL_API_KEY=your_mistral_api_key_here
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

This application is designed to be deployed on AWS Free Tier. See [aws-deploy/README.md](aws-deploy/README.md) for detailed deployment instructions.

## Usage

1. **Submit an Issue**: Fill out the issue form with details about the production problem.
2. **View Analysis**: The system will automatically categorize the issue to a responsible department.
3. **Contest Classifications**: If you disagree with the AI's assignment, use the contest button to provide feedback.
4. **Export Data**: Use the export button to download all issues as a CSV file.

## Project Structure

- `src/components/`: React components
- `src/services/`: API integration services
- `src/context/`: Application state management
- `src/styles/`: CSS styles
- `aws-deploy/`: AWS deployment configuration and instructions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built by BreezBlox
- Powered by Mistral AI 