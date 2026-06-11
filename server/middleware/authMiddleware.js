const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        message: "No Token",
      });
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};