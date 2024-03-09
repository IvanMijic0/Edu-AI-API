import express, { Request, Response } from 'express';
import { NoteService } from '../services';

const router = express.Router();

router.post('/note', async (req: Request, res: Response) => {
    try {
        const newNote = await NoteService.createNote(req.body);
        res.status(201).json(newNote);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/notes', async (_req: Request, res: Response) => {
    try {
        const notes = await NoteService.getAllNotes();
        res.json(notes);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/notes/:id', async (req: Request, res: Response) => {
    try {
        const note = await NoteService.getNoteById(req.params.id);
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.json(note);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.put('/notes/:id', async (req: Request, res: Response) => {
    try {
        const updatedNote = await NoteService.updateNoteById(req.params.id, req.body);
        if (!updatedNote) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.json(updatedNote);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.delete('/notes/:id', async (req: Request, res: Response) => {
    try {
        const deletedNote = await NoteService.deleteNoteById(req.params.id);
        if (!deletedNote) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.json({ message: 'Note deleted successfully' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

export default router;
