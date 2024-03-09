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

const verifyUserEmail = async (userId: string) => {
    try {
        return await User.findByIdAndUpdate(
            userId,
            {hasConfirmed : true},
            { new: true }
        );
    } catch (error) {
        throw new Error('Error verifying Email');
    }
};

const sendEmail = async (userId: string) => {
    try{
        const user = await User.findById(userId);

        const transporter = mailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: true,
            auth: {
              user: process.env.MAILER_EMAIL,
              pass: process.env.MAILER_PASSWORD,
            },
        });

        const url = process.env.MAIN_URL + "/api/verifyUserEmail/" + userId;

        const mailOptions: MailerData = {
            from: process.env.MAILER_EMAIL,
            to: user?.email,
            subject: "Email Reservation",
            html: await ejs.renderFile(process.cwd() + './utils/emailTemplate.ejs', { url }),
        };

        await transporter.sendMail(mailOptions);
        return
    } catch(error) {
        throw new Error('Error sending verification Email');
    }
}

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    verifyUserEmail,
    sendEmail
};