import { ObjectId } from "mongodb";

type Presentation = {
    _id: ObjectId;
    name: string;
    slide: string[];
    createdAt?: string;
}

export default Presentation;