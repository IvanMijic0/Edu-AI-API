import mongoose, {Schema, Document} from 'mongoose';

const TaskSchema = new mongoose.Schema({
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
    }
});

export default mongoose.model("Task", TaskSchema);