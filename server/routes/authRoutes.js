const express = require("express");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();


const { OAuth2Client} = require("google-auth-library");
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID);


/*
POST /api/auth/register
*/

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// POST /api/auth/login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


router.post( "/google", async(req,res)=>{
   try{
      const { credential} = req.body;

      const ticket = await client.verifyIdToken({

        idToken:
        credential,

        audience:
        process.env.GOOGLE_CLIENT_ID

      });

      const payload = ticket.getPayload();

      const { email, name,sub } = payload;

      let user = await User.findOne({ email});

      if(!user){

        user =await User.create({ name, email,googleId:sub });}

      const token =jwt.sign(
        { id:user._id },

        process.env.JWT_SECRET,

        { expiresIn:"7d" }
      );

      res.json({ token, user});
    }
    catch(error){

  console.error("Google Login Error:");

  console.error(error);

  return res.status(500).json({
    message: error.message,
    stack: error.stack
  });

}

  }
);

module.exports = router;