import express, { Router, Request, Response } from "express";

import { ChatResponse } from "../types";
import { OpenAIService } from "../services";

const router: Router = express.Router();

router.post('/chat', async (req: Request, res: Response) => {
    const { message } = req.body;

    try {
        const chatResponse: ChatResponse = await OpenAIService.sendMessage(message);

        res.json(chatResponse.choices[0].message);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/mix', async (req: Request, res: Response) => {
    const { notes, convertedLecture } = req.body;

    try {
        const chatResponse: ChatResponse = await OpenAIService.mixNotesSummary(notes, convertedLecture);

        res.json(chatResponse.choices[0].message);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/summarizeText', async (req, res) => {
    try {
        const { title, text } = req.body;
        if (!title || !text) {
            return res.status(400).json({ message: "Title and text are required" });
        }

        const summarizedData = await OpenAIService.summarizeText(title, text);
        res.status(200).json(summarizedData);
    } catch (error) {
        console.error('Error summarizing text:', error);
        res.status(500).json({ message: "Error summarizing text" });
    }
});

export default router;
