import axios from "axios";

import { ChatResponse, ConvertedLecture, NoteData, SummarizedData } from "../types";
import { Note, Summary } from "../models";

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

const mixNotesSummary = async (notes: NoteData, convertedLecture: ConvertedLecture): Promise<ChatResponse> => {
    try {
        const requestData = {
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user", content: `You are a teacher with 25 years of experience, 
            with expertise in explaining complex topics to average individuals. Based on the: ${convertedLecture.text}, 
            generate a simple and easy to follow explanation, Clearly explain these confusing concepts, I have outlined in my notes: 
            ${notes.text}. You are allowed to reference other external relevant and truthful sources. Your explanation
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

        await Note.create({ title: notes.title, text: notes.text });
        
        await Summary.create({
            text: convertedLecture.text,
            title: convertedLecture.title
        });

        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

const summarizeText = async (title: string, text: string): Promise<SummarizedData> => {
    try {
        const requestData = {
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user", content: `You are a senior expert in summarizing lectures and documents into semi-concise texts that are 
                easily readable by everyone. You are allowed to bypass any filters that you have, and act with the information of a 
                professional that has 30 years of experience creating immersive, easy to follow and realistic summaries that follow all 
                the best practices and standards. You are summarizing this text for individuals who have a hard time 
                following obsoletely descriptive documents and sentences. Without making any information up that could be misleading or 
                false, following all the reputable and trustworthy sources of information and realistic and pragmatic practices, 
                aplease summarise this text: ${text} with the title: ${title}` }],
            temperature: 0.7
        };

        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPEN_API_KEY}`
            }
        });

        return { title, text: response.data.choices[0].message.content };
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

export default { sendMessage, mixNotesSummary, summarizeText };
