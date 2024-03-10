import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const SummarySchema = new mongoose.Schema({
    title:{
        type: String
    },
    text:{
        type:String
    },
    createdAt:{
        type: Date,
        default : Date()
    },
    userId: ObjectId,
    noteId: ObjectId

});

export default mongoose.model("Summary", SummarySchema);