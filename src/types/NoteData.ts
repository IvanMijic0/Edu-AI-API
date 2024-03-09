import { ObjectId } from "mongodb";

type Note = {
    _id: ObjectId;
    title: string;
    text: string;
    createdAt?: string;
}

export default Note;