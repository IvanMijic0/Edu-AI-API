import mongoose from "mongoose";


const { Schema } = mongoose;

const user = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  dateOfBirth: String,
  imageUrl: String,
  hasPayed: {
    type: Boolean,
    default: false
  },
  hasConfirmed: {
    type: Boolean,
    default: false
  },
  taskIds: [String],
  notesIds: [String],
  presentationIds: [String],
  createdAt: {
    type: Date,
    default: Date(),
  },
  updatedAt: {
    type: Date,
    default: Date(),
  },
});

const User = mongoose.model("users", user);

export default User;
