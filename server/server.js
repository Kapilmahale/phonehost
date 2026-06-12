require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const deployRoutes = require("./routes/deployRoutes");
const statsRoutes =require("./routes/statsRoutes");


const app = express();

connectDB();


app.use(cors());   // Enable CORS for all routes
app.use(express.json());  // To parse JSON bodies

app.use("/api/test",testRoutes);  
app.use("/api/auth",authRoutes);
app.use("/api/deploy",deployRoutes);
app.use("/api/stats",statsRoutes);


app.use("/sites",express.static("websites"));

console.log(
  path.join(__dirname, "../client/dist")
);

app.get("/health", (req, res) => {
  res.send("Server Working");
});

//react build
app.use( express.static( path.join(__dirname,"../client/dist" )));


//react router catch all
app.use((req, res) => { res.sendFile(
    path.join(__dirname, "../client/dist/index.html")
  );
});


app.listen(5000, () => {
    console.log("Server Running");
  }
);