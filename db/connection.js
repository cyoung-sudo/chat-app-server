import mongoose from 'mongoose';
const uri = process.env.ATLAS_URI || "";

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log(err));