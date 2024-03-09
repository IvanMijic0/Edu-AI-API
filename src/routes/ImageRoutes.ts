import express, { Request, Response } from 'express';
import { UploadSingle } from '../middleware';

import { ImageService, UserService } from '../services';

const router = express.Router();

router.post('/upload', UploadSingle, async (req: Request, res: Response) => {
    try {
        const { userId } = req.query;
        if (typeof userId !== 'string') {
            throw new Error('userId must be a string');
        }
        const { BUCKET_NAME, BUCKET_REGION, ACCESS_KEY, SECRET_ACCESS_KEY } = process.env;
        
        console.log('userId:', userId);

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


router.get('/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            throw new Error('User ID is required');
        }

        const user = await UserService.getUserById(userId);
        if (!user || !user.imageUrl) {
            throw new Error('User not found or image URL not available');
        }

        const signedUrl = await ImageService.getImageFromS3(user.imageUrl);

        res.status(200).json({ signedUrl });
    } catch (error) {
        console.error('Error retrieving image from S3:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;
