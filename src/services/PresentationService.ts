import { Presentation } from '../models';
import { PresentationData } from '../types';

const createPresentation = async (presentationData: PresentationData) => {
    try {
        const newPresentation = new Presentation(presentationData);
        await newPresentation.save();
        return newPresentation;
    } catch (error) {
        if (error instanceof Error)
        throw new Error(error.message);
    }
};

const getAllPresentations = async () => {
    try {
        return await Presentation.find({});
    } catch (error) {
        throw new Error('Error retrieving Presentations');
    }
};

const getPresentationById = async (presentationId: string) => {
    try {
        return await Presentation.findById(presentationId);
    } catch (error) {
        throw new Error('Error retrieving Presentation');
    }
};

const updatePresentationById = async (presentationId: string, presentationData: PresentationData) => {
    try {
        return await Presentation.findByIdAndUpdate(presentationId, presentationData, { new: true });
    } catch (error) {
        throw new Error('Error updating Presentation');
    }
};

const deletePresentationById = async (presentationId: string) => {
    try {
        return await Presentation.findByIdAndDelete(presentationId);
    } catch (error) {
        throw new Error('Error deleting Presentation');
    }
};

export default {
    createPresentation,
    getAllPresentations,
    getPresentationById,
    updatePresentationById,
    deletePresentationById,
};