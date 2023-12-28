import { isAuth } from "@features/auth";
import { connectDB } from "@databases/db";
import Prompt from "@models/prompt";
const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(200).json({
      success: false,
      message: "Only GET is allowed",
    });
  }

  try {
    await connectDB();
    const user = await isAuth(req, res);
    const allPosts = await Prompt.find({});
    return res.status(200).json({
      success: true,
      allPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default handler;
