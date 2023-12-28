import { isAuth } from "@features/auth";
import { connectDB } from "@databases/db";
import Prompt from "@models/prompt";

const handler = async (req, res) => {
  try {
    await connectDB();
    const user = await isAuth(req, res);
    const { id } = req.query;
    const { prompt, tag } = req.body;
    if (user && req.method === "GET") {
      const userPrompt = await Prompt.findOne({
        _id: id,
        creator: user.username,
      });
      if (userPrompt) {
        return res.status(200).json({
          success: true,
          userPrompt,
        });
      }
      return res.status(200).json({
        success: false,
        message: "Invalid Post ID",
      });
    } else if (user && req.method === "PUT") {
      const updatePrompt = await Prompt.findOne({
        _id: id,
        creator: user.username,
      });
      if (!updatePrompt) {
        return res.status(200).json({
          success: false,
          message: "Invalid Post ID",
        });
      }
      updatePrompt.prompt = prompt;
      updatePrompt.tag = tag;
      updatePrompt.save();
      res.status(200).json({
        success: true,
        message: "Post Updated",
      });
    } else if (user && req.method === "DELETE") {
      const updatePrompt = await Prompt.findOne({
        _id: id,
        creator: user.username,
      });
      if (!updatePrompt) {
        return res.status(200).json({
          success: false,
          message: "Invalid Post ID",
        });
      }
      updatePrompt.deleteOne();
      res.status(200).json({
        success: true,
        message: "Post Deleted",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Only GET, PUT and DELETE are allowed",
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default handler;
