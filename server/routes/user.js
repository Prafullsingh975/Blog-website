const express = require("express");
const User = require("../models/user.js");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // destructure req.body
    const { firstName, lastName, email, password, gender, age } = req.body;
    // data validation required
    if (!firstName.trim() || !email.trim() || !password.trim())
      return res.status(400).json("Firstname,email,password is required");
    // finding user on the basis of email
    const isUser = await User.findOne({ email });
    if (isUser) return res.status(400).json("Email is already used");
    // Creating username
    const dataArr = email.split("@");
    const userName = dataArr[0];
    // Hashing plain text password
    const hash = "";
    // user registration
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      gender,
      age,
      userName,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    console.log("Error while user registration", error);
    return res
      .status(500)
      .json(`Error while user registration ${error.message}`);
  }
});

module.exports = router;
