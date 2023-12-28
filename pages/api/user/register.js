import User from "@models/user";
import bcrypt from "bcrypt";
import { connectDB } from "@databases/db";
connectDB();
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.json({
      success: false,
      message: "Only POST is allowed",
    });
  }

  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const validUsername =
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    if (!validUsername.test(username)) {
      return res.json({
        success: false,
        message: "Invlid Username",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    return res.status(201).json({
      success: true,
      message: "User registered",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Serve Error",
    });
  }
};

export default handler;
