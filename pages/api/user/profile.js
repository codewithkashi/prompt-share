import User from "@models/user";
import jwt from "jsonwebtoken";
import { connectDB } from "@databases/db";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.json({
      success: false,
      message: "Only GET is allowed",
    });
  }
  try {
    await connectDB();
    const { token } = req.cookies;
    if (!token) {
      res.json({
        success: false,
        message: "Login First",
      });
      return;
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await User.findById(decodedToken._id);
    if (user) {
      res.json({
        success: true,
        user,
      });
    } else {
      res.json({
        success: false,
        message: "Cookie did not Match",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Serve Error",
    });
  }
};

export default handler;
