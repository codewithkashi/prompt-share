import cookie from "cookie";
const handler = (req, res) => {
  if (req.method !== "GET") {
    res.json({
      success: false,
      message: "Only GET is allowed",
    });
    return;
  }

  try {
    res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          maxAge: 0,
          path: "/",
          httpOnly: true,
        })
      )
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
