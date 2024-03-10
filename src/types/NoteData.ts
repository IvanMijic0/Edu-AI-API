import { ObjectId } from "mongodb";

type Note = {
    _id: ObjectId;
    title: string;
    text: string;
    userId: ObjectId;
    createdAt?: string;
}

export default Note;