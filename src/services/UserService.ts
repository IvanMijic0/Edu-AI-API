import { User } from '../models';
import { UserData } from '../types';

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

export const updateUserImageUrl = async (userId: string, imageUrl: string): Promise<void> => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        user.imageUrl = imageUrl;

        await user.save();
    } catch (error) {
        if (error instanceof Error) {
             throw new Error(`Error updating user's image URL: ${error.message}`);
         }
         throw error;
    }
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    updateUserImageUrl,
    deleteUserById,
};