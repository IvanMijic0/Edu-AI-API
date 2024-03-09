import { Task } from '../models';
import { TaskData } from '../types';

const createTask = async (taskData: TaskData) => {
    try {
        const newTask = new Task(taskData);
        await newTask.save();
        return newTask;
    } catch (error) {
        if (error instanceof Error)
        throw new Error(error.message);
    }
};

const getAllTasks = async () => {
    try {
        return await Task.find({});
    } catch (error) {
        throw new Error('Error retrieving Tasks');
    }
};

const getTaskById = async (taskId: string) => {
    try {
        return await Task.findById(taskId);
    } catch (error) {
        throw new Error('Error retrieving Task');
    }
};

const updateTaskById = async (taskId: string, taskData: TaskData) => {
    try {
        return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
    } catch (error) {
        throw new Error('Error updating Task');
    }
};

const deleteTaskById = async (taskId: string) => {
    try {
        return await Task.findByIdAndDelete(taskId);
    } catch (error) {
        throw new Error('Error deleting Task');
    }
};

export default {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
};