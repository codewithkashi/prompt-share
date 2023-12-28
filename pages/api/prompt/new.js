import Prompt from "@models/prompt";
import { connectDB } from "@databases/db";
import { isAuth } from "@features/auth";
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.json({
      success: false,
      message: "Only POST is allowed",
    });
  }
  await connectDB();
  const user = await isAuth(req, res);
  if (user) {
    const { prompt, tag } = req.body;
    await Prompt.create({
      prompt,
      tag,
      creator: user.username,
    });
    res.status(200).json({
      success: true,
      message: "Prompt Created",
    });
  }
};

export default handler;
