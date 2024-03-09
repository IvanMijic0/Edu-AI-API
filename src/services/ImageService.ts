import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const randomImageName = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString('hex');
}

export const uploadFileToS3 = async (bucketName: string, bucketRegion: string, accessKey: string, secretAccessKey: string, file: Express.Multer.File): Promise<string> => {
    const s3Client = new S3Client({
        region: bucketRegion,
        credentials: {
            accessKeyId: accessKey,
            secretAccessKey: secretAccessKey
        }
    });

    const imageName = randomImageName();
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: imageName,
        Body: file.buffer,
        ContentType: file.mimetype
    });

    await s3Client.send(command);

    return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageName}`;
};

export default {
    uploadFileToS3
};