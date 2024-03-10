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
    PORT=3000
    DB_CONNECTION_STRING=mongodb+srv://ivanmijic159951:GSePeh24LCoJe7fW@studentaitoolkit.wtmwuse.mongodb.net/?retryWrites=true&w=majority&appName=StudentAIToolkit
    JWT_SECRET=asdaibdwiaqy3184y14124719ashidajshasuhsdgdisdiudw98eq9871274124719yahdijsaihsi
    BUCKET_NAME=student-ai-toolkit
    BUCKET_REGION=eu-north-1
    ACCESS_KEY=AKIATCKAMOWIC7LWW2MC
    SECRET_ACCESS_KEY=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
    OPEN_API_KEY=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
    OPEN_API_ORGANIZATION_ID=org-W2JU9SDONGlsi8vVkFyipa2i
    MAIN_URL=http://localhost:3000
    MAILER_EMAIL=adnan.dzindo1507@gmail.com
    MAILER_PASSWORD=aK3bVp9TyqIz8mPR

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

