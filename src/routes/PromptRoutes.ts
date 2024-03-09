import express, { Request, Response } from 'express';
import { PromptService } from '../services';

const router = express.Router();

router.post('/prompt', async (req: Request, res: Response) => {
    try {
        const newPrompt = await PromptService.createPrompt(req.body);
        res.status(201).json(newPrompt);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/prompts', async (_req: Request, res: Response) => {
    try {
        const prompts = await PromptService.getAllPrompts();
        res.json(prompts);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/prompts/:id', async (req: Request, res: Response) => {
    try {
        const prompt = await PromptService.getPromptById(req.params.id);
        if (!prompt) {
            res.status(404).json({ message: 'Prompt not found' });
        } else {
            res.json(prompt);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.put('/prompts/:id', async (req: Request, res: Response) => {
    try {
        const updatedPrompt = await PromptService.updatePromptById(req.params.id, req.body);
        if (!updatedPrompt) {
            res.status(404).json({ message: 'Prompt not found' });
        } else {
            res.json(updatedPrompt);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.delete('/prompts/:id', async (req: Request, res: Response) => {
    try {
        const deletedPrompt = await PromptService.deletePromptById(req.params.id);
        if (!deletedPrompt) {
            res.status(404).json({ message: 'Prompt not found' });
        } else {
            res.json({ message: 'Prompt deleted successfully' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

export default router;
