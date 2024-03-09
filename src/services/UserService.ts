import { User } from '../models';

import { User } from '../types';

const createUser = async (userData: User) => {
    try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error('Error creating user');
    }
};

const getAllUsers = async () => {
    try {
        return await User.find({});
    } catch (error) {
        throw new Error('Error retrieving users');
    }
};

const getUserById = async (userId: string) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        throw new Error('Error retrieving user');
    }
};

const updateUserById = async (userId: string, userData: any) => {
    try {
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
    deleteUserById,
};