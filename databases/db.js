import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Databse");
  } catch (error) {
    console.log("Failed to Connect to Database");
  }
};
