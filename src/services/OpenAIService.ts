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

export default { sendMessage };
