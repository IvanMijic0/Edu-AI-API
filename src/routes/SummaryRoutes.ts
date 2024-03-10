import express, { Request, Response } from 'express';
import { SummaryService } from '../services';

const router = express.Router();

router.post('/summary', async (req: Request, res: Response) => {
    try {
        const newSummary = await SummaryService.createSummary(req.body);
        res.status(201).json(newSummary);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/summarys', async (_req: Request, res: Response) => {
    try {
        const summarys = await SummaryService.getAllSummarys();
        res.json(summarys);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/summarys/:id', async (req: Request, res: Response) => {
    try {
        const summary = await SummaryService.getSummaryById(req.params.id);
        if (!summary) {
            res.status(404).json({ message: 'Summary not found' });
        } else {
            res.json(summary);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/summary/:userId', async (req: Request, res: Response) => {
    try {
        const summary = await SummaryService.getSummaryByUserId(req.params.userId);
        if (!summary) {
            res.status(404).json({ message: 'Summary not found' });
        } else {
            res.json(summary);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.put('/summarys/:id', async (req: Request, res: Response) => {
    try {
        const updatedSummary = await SummaryService.updateSummaryById(req.params.id, req.body);
        if (!updatedSummary) {
            res.status(404).json({ message: 'Summary not found' });
        } else {
            res.json(updatedSummary);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.delete('/summarys/:id', async (req: Request, res: Response) => {
    try {
        const deletedSummary = await SummaryService.deleteSummaryById(req.params.id);
        if (!deletedSummary) {
            res.status(404).json({ message: 'Summary not found' });
        } else {
            res.json({ message: 'Summary deleted successfully' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

export default router;
