import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const singleUpload = (fieldName: string) => {
  return upload.single(fieldName);
};

export default singleUpload;
