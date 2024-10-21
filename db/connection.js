import mongoose from 'mongoose';
const uri = process.env.ATLAS_URI || "";

export const connectToDatabase = () => {
  return mongoose.connect(uri);
};