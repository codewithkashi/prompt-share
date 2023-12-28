import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, select: false, required: true },
});
mongoose.models = {};
const User = mongoose.model("users", userSchema);
export default User;