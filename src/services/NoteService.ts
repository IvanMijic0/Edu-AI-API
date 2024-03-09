import { Note } from '../models';
import { NoteData } from '../types';

const createNote = async (noteData: NoteData) => {
    try {
        const newNote = new Note(noteData);
        await newNote.save();
        return newNote;
    } catch (error) {
        if (error instanceof Error)
        throw new Error(error.message);
    }
};

const getAllNotes = async () => {
    try {
        return await Note.find({});
    } catch (error) {
        throw new Error('Error retrieving Notes');
    }
};

const getNoteById = async (noteId: string) => {
    try {
        return await Note.findById(noteId);
    } catch (error) {
        throw new Error('Error retrieving Note');
    }
};

const updateNoteById = async (noteId: string, noteData: NoteData) => {
    try {
        return await Note.findByIdAndUpdate(noteId, noteData, { new: true });
    } catch (error) {
        throw new Error('Error updating Note');
    }
};

const deleteNoteById = async (noteId: string) => {
    try {
        return await Note.findByIdAndDelete(noteId);
    } catch (error) {
        throw new Error('Error deleting Note');
    }
};

export default {
    createNote,
    getAllNotes,
    getNoteById,
    updateNoteById,
    deleteNoteById,
};