import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema({
    name:{
        type: String
    },
    prompt:{
        type:String
    },
    answer:{
        type:String
    },
    createdAt:{
        type: Date,
        default : Date()
    },
    noteId: ObjectId

});

export default mongoose.model("Prompt", PromptSchema);