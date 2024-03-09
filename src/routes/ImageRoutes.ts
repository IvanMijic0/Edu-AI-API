import express, { Request, Response } from 'express';
import { UploadSingle } from '../middleware';
import { ImageService, UserService } from '../services';

const router = express.Router();

router.post('/upload', UploadSingle, async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const { BUCKET_NAME, BUCKET_REGION, ACCESS_KEY, SECRET_ACCESS_KEY } = process.env;
        
        if (!BUCKET_NAME || !BUCKET_REGION || !ACCESS_KEY || !SECRET_ACCESS_KEY || !userId) {
            throw new Error('Missing required parameters');
        }
        if (!req.file) {
            throw new Error('No file provided');
        }

        const imageUrl = await ImageService.uploadFileToS3(BUCKET_NAME, BUCKET_REGION, ACCESS_KEY, SECRET_ACCESS_KEY, req.file);

        await UserService.updateUserImageUrl(userId, imageUrl);

        res.status(201).json({ message: 'File uploaded', imageUrl });
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

export default router;
