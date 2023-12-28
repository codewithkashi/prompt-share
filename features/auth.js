import jwt from "jsonwebtoken";
import User from "@models/user";
import { connectDB } from "@databases/db";
connectDB();
export const isAuth = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({
      success: false,
      message: "Login First",
    });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const user = await User.findOne({ _id: decodedToken._id });
  if (user) {
    return user;
  } else {
    return res.json({
      success: false,
      message: "Invalid Cookie",
    });
  }
};
