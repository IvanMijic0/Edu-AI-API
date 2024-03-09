import mongoose from 'mongoose';

const SlideSchema = new mongoose.Schema({
    title:{
        type: String
    },
    number:{
        type: Number
    },
    text:{
        type:String
    }
});

export default mongoose.model("Slide", SlideSchema);