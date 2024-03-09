import express, { Request, Response } from 'express';
import { PresentationService } from '../services';

const router = express.Router();

router.post('/presentation', async (req: Request, res: Response) => {
    try {
        const newPresentation = await PresentationService.createPresentation(req.body);
        res.status(201).json(newPresentation);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/presentations', async (_req: Request, res: Response) => {
    try {
        const presentations = await PresentationService.getAllPresentations();
        res.json(presentations);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/presentations/:id', async (req: Request, res: Response) => {
    try {
        const presentation = await PresentationService.getPresentationById(req.params.id);
        if (!presentation) {
            res.status(404).json({ message: 'Presentation not found' });
        } else {
            res.json(presentation);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.put('/presentations/:id', async (req: Request, res: Response) => {
    try {
        const updatedPresentation = await PresentationService.updatePresentationById(req.params.id, req.body);
        if (!updatedPresentation) {
            res.status(404).json({ message: 'Presentation not found' });
        } else {
            res.json(updatedPresentation);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.delete('/presentations/:id', async (req: Request, res: Response) => {
    try {
        const deletedPresentation = await PresentationService.deletePresentationById(req.params.id);
        if (!deletedPresentation) {
            res.status(404).json({ message: 'Presentation not found' });
        } else {
            res.json({ message: 'Presentation deleted successfully' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

export default router;
