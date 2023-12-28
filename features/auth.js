import jwt from "jsonwebtoken";
import User from "@models/user";
import { connectDB } from "@databases/db";
connectDB();
export const isAuth = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(200).json({
      success: false,
      message: "Login First",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await User.findOne({ _id: decodedToken._id });
    if (user) {
      return user;
    } else {
      return res.status(200).json({
        success: false,
        message: "Invalid Cookie",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
