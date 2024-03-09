import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';

const randomImageName = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString('hex');
}

const uploadFileToS3 = async (bucketName: string, bucketRegion: string, accessKey: string, secretAccessKey: string, file: Express.Multer.File): Promise<string> => {
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

const getImageFromS3 = async (imageName: string): Promise<string> => {
    const bucketName = process.env.BUCKET_NAME;
    const bucketRegion = process.env.BUCKET_REGION;
    const accessKey = process.env.ACCESS_KEY;
    const secretAccessKey = process.env.SECRET_ACCESS_KEY;

    if (!bucketName || !bucketRegion || !accessKey || !secretAccessKey) {
        throw new Error('Missing required environment variables for S3 configuration');
    }

    const s3Client = new S3Client({
        region: bucketRegion,
        credentials: {
            accessKeyId: accessKey,
            secretAccessKey: secretAccessKey
        }
    });

    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: imageName
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 48 * 60 * 60 });

    return signedUrl;
};

export default {
    uploadFileToS3,
    getImageFromS3
};