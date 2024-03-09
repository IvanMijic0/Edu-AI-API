import { ObjectId } from "mongodb";

type User = {
    _id: string | ObjectId;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    hasPayed?: boolean | undefined;
    dateOfBirth: string;
    imageUrl?: string;
    taskIds?: string[];
    notesIds?: string[];
    presentationIds?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default User;