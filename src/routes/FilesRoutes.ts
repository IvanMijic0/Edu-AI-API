import express, { Request, Response } from 'express';
import { FileService } from '../services';
import multer from 'multer';
import PDFParser from 'pdf-parse';
import jwt from 'jsonwebtoken';


const router = express.Router();
const upload = multer();


router.post('/readPdf', upload.single('pdf'), async (req, res) => {
    try {
        const userId = req.body.userId;
        const title = req.body.title;
        const pdf = req.file;

        const dataBuffer = pdf?.buffer;
        const pdfText = dataBuffer && await PDFParser(dataBuffer);

        if (pdfText?.text === undefined) return;

        await FileService.saveToMongoDB(title, pdfText.text, userId);

        res.status(200).json({ message: "PDF file read successfully", text: pdfText?.text });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error reading PDF file" });
    }
});



router.get('/files', async (_req: Request, res: Response) => {
    try {
        const files = await FileService.getAllFile();
        res.json(files);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/files/:id', async (req: Request, res: Response) => {
    try {
        const file = await FileService.getFileById(req.params.id);
        if (!file) {
            res.status(404).json({ message: 'File not found' });
        } else {
            res.json(file);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.delete('/file/:id', async (req: Request, res: Response) => {
    try {
        const deletedFile = await FileService.deleteFileById(req.params.id);
        if (!deletedFile) {
            res.status(404).json({ message: 'File not found' });
        } else {
            res.json({ message: 'File deleted successfully' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

export default router;