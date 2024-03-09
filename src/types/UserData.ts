type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    hasPayed?: boolean;
    dateOfBirth: string;
    imageUrl?: string;
    taskIds?: string[];
    notesIds?: string[];
    presentationIds?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default User;