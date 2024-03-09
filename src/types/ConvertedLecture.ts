import { ObjectId } from "mongoose";

type ConvertedLecture = {
    _id: ObjectId;
    title: string;
    text: string;
    createdAt?: string;
};

export default ConvertedLecture;