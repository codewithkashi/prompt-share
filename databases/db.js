import mongoose from "mongoose";
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "promptopia" })
    .then(console.log("Connected to Databse"))
    .catch("Failed to Connect to Database");
};
