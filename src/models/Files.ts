import mongoose from 'mongoose';

const FilesSchema = new mongoose.Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date()
    }
});

export default mongoose.model("Files", FilesSchema);