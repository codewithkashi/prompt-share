import mongoose from "mongoose";
const promptSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  tag: { type: String, required: true },
  creator: { required: true, type: String },
});
mongoose.models = {};
const Prompt = mongoose.model("prompts", promptSchema);
export default Prompt;
