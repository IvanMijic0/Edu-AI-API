import mongoose, {Schema, Document} from 'mongoose';

const PresentationSchema = new mongoose.Schema({
    name:{
        type: String
    },
    prompt:{
        type:String
    },
    slides:[{
        type: Schema.Types.ObjectId,
        ref: 'Slide'
    }],
    createdAt:{
        type: Date,
        default : Date()
    }
});

export default mongoose.model("Presentation", PresentationSchema);