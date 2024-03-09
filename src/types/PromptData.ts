import { ObjectId } from "mongoose";

type Prompt = {
    _id: string;
    name: string;
    prompt: string;
    answer: string;
    noteId: ObjectId;
    createdAt?: string;
}

export default Prompt;