import { ObjectId } from "mongodb";

type Summary = {
    _id: ObjectId;
    title: string;
    text: string;
    userId: ObjectId;
    createdAt?: string;
}

export default Summary;