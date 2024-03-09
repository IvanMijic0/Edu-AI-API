import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models";
import { UserData } from "../types";

const JWT_SECRET: string = process.env.JWT_SECRET || 'default_secret';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;

export const registerUser = async (email: string, password: string, firstName: string, lastName: string): Promise<UserData | undefined> => {
    try {
        if (!EMAIL_REGEX.test(email)) {
            throw new Error("Invalid email format");
        }

        if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
            throw new Error(`Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters`);
        }

        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ 
            email, 
            password: hashedPassword, 
            firstName, 
            lastName,
            hasPayed: false,
            taskIds: [],
            notesIds: [],
            presentationIds: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }) as unknown as UserData;
        return newUser;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Error registering user: " + error.message);
        }
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        if (!EMAIL_REGEX.test(email)) {
            throw new Error("Invalid email format");
        }

        if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
            throw new Error(`Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters`);
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Unauthorized");
        }

        const validPassword = user.password ? bcrypt.compare(password, user.password) : false;
        if (!validPassword) {
            throw new Error("Unauthorized");
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return token;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Error logging in: " + error.message);
        }
    }
};

export const validateToken = (token: string) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject(new Error("Token is required"));
        }

        jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                reject(new Error("Invalid token"));
            }
            resolve(decoded);
        });
    });
}

export default {
    registerUser,
    loginUser,
    validateToken,
};
