import axios from "axios";

import { ChatRequest, ChatResponse } from "../types";


const processChatRequest = async (request: ChatRequest): Promise<ChatResponse> => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', request, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` 
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error processing chat request:', error);
        throw error;
    }
}

export default { processChatRequest };