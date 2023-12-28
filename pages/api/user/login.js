import User from "@models/user";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { connectDB } from "@databases/db";

const handler = async (req, res, next) => {
  if (req.method !== "POST") {
    return res.json({
      success: false,
      message: "Only POST is allowed",
    });
  }
  try {
    await connectDB();
    const { email, password } = req.body;
    const userData = await User.findOne({ email }).select("+password");

    if (userData == null) {
      res.json({
        success: false,
        message: "Register First",
      });

      return;
    }
    const isMatch = await bcrypt.compare(password, userData.password);
    const token = jwt.sign({ _id: userData.id }, process.env.SECRET_TOKEN);
    if (userData.email != null && !isMatch) {
      res.json({
        success: false,
        message: "Wrong Password",
      });
    } else if (userData.email != null && isMatch) {
      res
        .setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            path: "/",
            httpOnly: true,
          })
        )
        .json({
          success: true,
          message: "Logged in",
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
