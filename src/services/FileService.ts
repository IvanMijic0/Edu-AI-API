import { Files, Summary } from "../models";
import OpenAIService from "./OpenAIService";

const saveToMongoDB = async (title: string, text: string, userId: string) => {
    try {
        await Files.create({ title, text });
        const { title: sumTitle, text: sumText } = await OpenAIService.summarizeText(title, text);
        await Summary.create({ title: sumTitle, text: sumText, userId });
    } catch (error) {
        console.error("Error saving text to MongoDB:", error);
    }
};

const getAllFile = async () => {
    try {
        return await Files.find({});
    } catch (error) {
        throw new Error('Error retrieving Files');
    }
};

const getFileById = async (fileId: string) => {
    try {
        return await Files.findById(fileId);
    } catch (error) {
        throw new Error('Error retrieving Files');
    }
};

const deleteFileById = async (fileId: string) => {
    try {
        return await Files.findByIdAndDelete(fileId);
    } catch (error) {
        throw new Error('Error deleting File');
    }
};

export default {
    saveToMongoDB,
    getAllFile,
    getFileById,
    deleteFileById
};

