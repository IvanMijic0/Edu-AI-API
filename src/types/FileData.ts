import { ObjectId } from "mongodb";

type Pdf = {
    _id: ObjectId;
    title: String;
    text: string;
    createdAt?: string;
}

export default Pdf;