# Project Name: AI Summarization and Learning Platform

## Overview
This project aims to provide a platform where users can summarize texts, extract lessons from them, and utilize various features such as converting audio/video to text for further processing. The backend is built using Node.js, Express, and MongoDB, while the frontend is developed using Next.js. The AI functionalities are integrated using the OpenAI API.

## Team Members
- Leonardo Roić (Frontend)
- Adnan Brlić (Frontend)
- Kenan Omerbegovic (Frontend)
- Adnan Džindo (Backend)
- Ivan Mijić (Backend)

## Features
- Text Summarization using OpenAI API
- Lesson Extraction from Texts with Questions
- Audio/Video to Text Conversion
- Note-taking Functionality

## Setup Instructions
To run the project locally, follow the steps below:

### Backend Setup
1. Clone the backend repository:
   ```
   git clone <backend-repo-link>
   ```
2. Navigate to the backend directory:
   ```
   cd <backend-directory>
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables. Create a `.env` file and add the following variables:
   ```
   ```
5. Start the server:
   ```
   npm start dev
   ```

### Frontend Setup
1. Clone the frontend repository:
   ```
   git clone <frontend-repo-link>
   ```
2. Navigate to the frontend directory:
   ```
   cd <frontend-directory>
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables. Create a `.env.local` file and add the following variables:
   ```
    NEXT_PUBLIC_BACKEND_API="http://localhost:3333/api"
    NEXT_PUBLIC_BACKEND_AUTH="http://localhost:3333/api/auth"
    NEXT_PUBLIC_SECRET_REDUX_KEY="LethalCompany123"
   ```
5. Start the frontend application:
   ```
   npm run dev
   ```

## Additional Information
- Backend Repository: [Link to Backend Repository](https://github.com/IvanMijic0/Edu-AI-API)
- Frontend Repository: [Link to Frontend Repository](https://github.com/FiggyHunter/StudentAIToolsFE)
- Technologies Used: Node.js, Express, MongoDB, Next.js, OpenAI API

