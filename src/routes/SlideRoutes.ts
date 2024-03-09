import express, { Request, Response } from 'express';
import { SlideService } from '../services';

const router = express.Router();

router.post('/slide', async (req: Request, res: Response) => {
    try {
        const newSlide = await SlideService.createSlide(req.body);
        res.status(201).json(newSlide);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/slides', async (_req: Request, res: Response) => {
    try {
        const slides = await SlideService.getAllSlides();
        res.json(slides);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/slides/:id', async (req: Request, res: Response) => {
    try {
        const slide = await SlideService.getSlideById(req.params.id);
        if (!slide) {
            res.status(404).json({ message: 'Slide not found' });
        } else {
            res.json(slide);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.put('/slides/:id', async (req: Request, res: Response) => {
    try {
        const updatedSlide = await SlideService.updateSlideById(req.params.id, req.body);
        if (!updatedSlide) {
            res.status(404).json({ message: 'Slide not found' });
        } else {
            res.json(updatedSlide);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.delete('/slides/:id', async (req: Request, res: Response) => {
    try {
        const deletedSlide = await SlideService.deleteSlideById(req.params.id);
        if (!deletedSlide) {
            res.status(404).json({ message: 'Slide not found' });
        } else {
            res.json({ message: 'Slide deleted successfully' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

export default router;
