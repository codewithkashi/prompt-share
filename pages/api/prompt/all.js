import { isAuth } from "@features/auth";
import Prompt from "@models/prompt";
const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.json({
      success: false,
      message: "Only GET is allowed",
    });
  }
  const user = await isAuth(req, res);
  if (user) {
    try {
      const allPosts = await Prompt.find({});
      res
        .json({
          success: true,
          allPosts,
        })
        .status(200);
    } catch (error) {
      res.json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export default handler;
