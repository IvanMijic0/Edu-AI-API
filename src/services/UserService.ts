import { User } from '../models';
import { UserData, MailerData } from '../types';
import mailer from 'nodemailer';
import ejs from 'ejs';

const createUser = async (userData: UserData) => {
    try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        if (error instanceof Error)
            throw new Error(error.message);
    }
};

const getAllUsers = async () => {
    try {
        return await User.find({}).select("-password");
    } catch (error) {
        throw new Error('Error retrieving users');
    }
};

const getUserById = async (userId: string) => {
    try {
        return await User.findById(userId).select("-password");
    } catch (error) {
        throw new Error('Error retrieving user');
    }
};


const updateUserById = async (userId: string, userData: UserData) => {
    try {
        userData.updatedAt = new Date();

        return await User.findByIdAndUpdate(userId, userData, { new: true });
    } catch (error) {
        throw new Error('Error updating user');
    }
};

const deleteUserById = async (userId: string) => {
    try {
        return await User.findByIdAndDelete(userId);
    } catch (error) {
        throw new Error('Error deleting user');
    }
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    updateUserImageUrl,
    deleteUserById,
    verifyUserEmail,
    sendEmail
};