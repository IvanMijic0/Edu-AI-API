import express, { Router, Request, Response } from "express";

import { ChatRequest, ChatResponse } from "../types";
import { OpenAIService } from "../services";

const router: Router = express.Router();

router.post('/chat', async (req: Request, res: Response) => {
  const { model, messages, temperature }: ChatRequest = req.body;

  try {
    const chatResponse: ChatResponse = await OpenAIService.processChatRequest({ model, messages, temperature });

    res.json(chatResponse.choices[0].message);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
