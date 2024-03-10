import { Summary } from '../models';
import { SummaryData } from '../types';

const createSummary = async (summaryData: SummaryData) => {
    try {
        const newSummary = new Summary(summaryData);
        await newSummary.save();
        return newSummary;
    } catch (error) {
        if (error instanceof Error)
        throw new Error(error.message);
    }
};

const getAllSummarys = async () => {
    try {
        return await Summary.find({});
    } catch (error) {
        throw new Error('Error retrieving Summarys');
    }
};

const getSummaryById = async (summaryId: string) => {
    try {
        return await Summary.findById(summaryId);
    } catch (error) {
        throw new Error('Error retrieving Summary');
    }
};

const updateSummaryById = async (summaryId: string, summaryData: SummaryData) => {
    try {
        return await Summary.findByIdAndUpdate(summaryId, summaryData, { new: true });
    } catch (error) {
        throw new Error('Error updating Summary');
    }
};

const deleteSummaryById = async (summaryId: string) => {
    try {
        return await Summary.findByIdAndDelete(summaryId);
    } catch (error) {
        throw new Error('Error deleting Summary');
    }
};

const getSummaryByUserId = async (userId: string) => {
    try {
        return await Summary.findById(userId);
    } catch (error) {
        throw new Error('Error deleting Summary');
    }
};

export default {
    createSummary,
    getAllSummarys,
    getSummaryById,
    updateSummaryById,
    deleteSummaryById,
    getSummaryByUserId
};