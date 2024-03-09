import { Slide, Presentation } from '../models';
import { SlideData } from '../types';

const createSlide = async (slideData: SlideData) => {
    try {
        const newSlide = new Slide(slideData);
        await Presentation.findByIdAndUpdate(
            slideData.presentationId, 
            { $push: { slides: newSlide._id } },
            { new: true });
        await newSlide.save();
        return newSlide;
    } catch (error) {
        if (error instanceof Error)
        throw new Error(error.message);
    }
};

const getAllSlides = async () => {
    try {
        return await Slide.find({});
    } catch (error) {
        throw new Error('Error retrieving Slides');
    }
};

const getSlideById = async (slideId: string) => {
    try {
        return await Slide.findById(slideId);
    } catch (error) {
        throw new Error('Error retrieving Slide');
    }
};

const updateSlideById = async (slideId: string, slideData: SlideData) => {
    try {
        return await Slide.findByIdAndUpdate(slideId, slideData, { new: true });
    } catch (error) {
        throw new Error('Error updating Slide');
    }
};

const deleteSlideById = async (slideId: string) => {
    try {
        return await Slide.findByIdAndDelete(slideId);
    } catch (error) {
        throw new Error('Error deleting Slide');
    }
};

export default {
    createSlide,
    getAllSlides,
    getSlideById,
    updateSlideById,
    deleteSlideById,
};