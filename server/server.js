require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const deployRoutes = require("./routes/deployRoutes");


const app = express();

connectDB();

app.use(cors());   // Enable CORS for all routes
app.use(express.json());  // To parse JSON bodies

app.use("/api/test",testRoutes);  
app.use("/api/auth",authRoutes);
app.use("/api/deploy",deployRoutes);
app.get("/", (req, res) => {res.send("Backend Running");});

app.use("/sites",express.static("websites"));

app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello from Express"
  });
});

app.listen( process.env.PORT || 5000,
  () => {
    console.log("Server Running");
  }
);