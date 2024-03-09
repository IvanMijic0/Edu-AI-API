import { ObjectId } from "mongodb";

type Slide = {
    _id: ObjectId;
    presentationId:string,
    title: string;
    number: number;
    text: string;
    createdAt?: string;
}

export default Slide;