import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
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

export default mongoose.model("Note", NoteSchema);