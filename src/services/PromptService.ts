import { Prompt } from '../models';
import { PromptData } from '../types';

const createPrompt = async (promptData: PromptData) => {
    try {
        const newPrompt = new Prompt(promptData);
        await newPrompt.save();
        return newPrompt;
    } catch (error) {
        if (error instanceof Error)
        throw new Error(error.message);
    }
};

const getAllPrompts = async () => {
    try {
        return await Prompt.find({});
    } catch (error) {
        throw new Error('Error retrieving Prompts');
    }
};

const getPromptById = async (promptId: string) => {
    try {
        return await Prompt.findById(promptId);
    } catch (error) {
        throw new Error('Error retrieving Prompt');
    }
};

const updatePromptById = async (promptId: string, promptData: PromptData) => {
    try {
        return await Prompt.findByIdAndUpdate(promptId, promptData, { new: true });
    } catch (error) {
        throw new Error('Error updating Prompt');
    }
};

const deletePromptById = async (promptId: string) => {
    try {
        return await Prompt.findByIdAndDelete(promptId);
    } catch (error) {
        throw new Error('Error deleting Prompt');
    }
};

export default {
    createPrompt,
    getAllPrompts,
    getPromptById,
    updatePromptById,
    deletePromptById,
};