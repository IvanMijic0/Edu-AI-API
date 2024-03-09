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

export default router;
