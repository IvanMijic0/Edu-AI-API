type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    dateOfBirth: string;
    imageUrl?: string;
    taskIds?: string[];
    notesIds?: string[];
    presentationIds?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export default User;