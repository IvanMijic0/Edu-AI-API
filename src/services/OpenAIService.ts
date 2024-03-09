import axios from "axios";
import { ChatResponse } from "../types";

const sendMessage = async (message: string): Promise<ChatResponse> => {
    try {
        const requestData = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            temperature: 0.7
        };

        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPEN_API_KEY}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

const mixNotesSummary = async (notes: string, summary: string): Promise<ChatResponse> => {
    try {
        const requestData = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `You are a teacher with 25 years of experience, 
            with expertise in explaining complex topics to average individuals. Based on the: ${notes}, 
            generate a simple and easy to follow explanation, Clearly explain these confusing concepts, I have outlined in my notes: 
            ${summary}. You are allowed to reference other external relevant and truthful sources. Your explanation
            should also be very intuitive. Do not make information up. Only generate information from existing resources 
            and research and don't be ubiquitous.` }],
            temperature: 0.7
        };

        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPEN_API_KEY}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

export default { sendMessage, mixNotesSummary};
