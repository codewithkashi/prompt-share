import { isAuth } from "@features/auth";
import { connectDB } from "@databases/db";
import Prompt from "@models/prompt";
connectDB();
const handler = async (req, res) => {
  try {
    const user = await isAuth(req, res);
    const { id } = req.query;
    const { prompt, tag } = req.body;
    if (user && req.method === "GET") {
      const userPrompt = await Prompt.findOne({
        _id: id,
        creator: user.username,
      });
      if (userPrompt) {
        return res.json({
          success: true,
          userPrompt,
        });
      }
      return res.json({
        success: false,
        message: "Invalid Post ID",
      });
    } else if (user && req.method === "PUT") {
      const updatePrompt = await Prompt.findOne({
        _id: id,
        creator: user.username,
      });
      if (!updatePrompt) {
        return res.json({
          success: false,
          message: "Invalid Post ID",
        });
      }
      updatePrompt.prompt = prompt;
      updatePrompt.tag = tag;
      updatePrompt.save();
      res.json({
        success: true,
        message: "Post Updated",
      });
    } else if (user && req.method === "DELETE") {
      const updatePrompt = await Prompt.findOne({
        _id: id,
        creator: user.username,
      });
      if (!updatePrompt) {
        return res.json({
          success: false,
          message: "Invalid Post ID",
        });
      }
      updatePrompt.deleteOne();
      res.json({
        success: true,
        message: "Post Deleted",
      });
    } else {
      res.json({
        success: false,
        message: "Only GET, PUT and DELETE are allowed",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default handler;
