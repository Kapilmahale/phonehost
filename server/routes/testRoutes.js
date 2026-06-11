const express = require("express");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile",auth,(req, res) => {
    res.json({
      message: "Protected Route",
      userId: req.user.id,
    });
  }
);

module.exports = router;