const express = require("express");
const si = require("systeminformation");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  auth,
  async (req, res) => {
    try {

      const cpu =
        await si.currentLoad();

      const memory =
        await si.mem();

      const uptime =
        await si.time();

      res.json({
        cpu:
          cpu.currentLoad.toFixed(2),

        ram:
          (
            (memory.used /
              memory.total) *
            100
          ).toFixed(2),

        uptime:
          Math.floor(
            uptime.uptime / 3600
          ) + " Hours",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);

module.exports = router;