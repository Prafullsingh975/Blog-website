const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const { cloudinaryUplaod } = require("../middleware/cloudinary.js");
const sendMail = require("../utils/nodeMailer.js");

// upload profile left
const registerUser = async (req, res) => {
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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const response = await cloudinaryUplaod(req.file.path);
    // user registration
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      gender,
      age,
      userName,
      profile: response.url,
    });
    await sendMail(email, "Sending Email using Node.js", "Text");
    const user = await User.findById(newUser._id).select("-password");

    return res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    console.log("Error while user registration", error);
    return res
      .status(500)
      .json(`Error while user registration ${error.message}`);
  }
};

const logInUser = async (req, res) => {
  try {
    // destructure
    const { email, password } = req.body;
    // Validate
    if (!email.trim() || !password.trim())
      return res.status(400).json("Email password requires");
    // fetch user
    const isUser = await User.findOne({ email: email });
    if (!isUser) return res.status(404).json("User not found");
    // check password
    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) return res.status(403).json("Invalid password");
    // generate token using HS256 algo
    const token = await jwt.sign(
      { id: isUser._id, email: isUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Convert mongooDB obj to JS obj
    const loggedInUser = { ...isUser.toObject(), token };
    delete loggedInUser.password;
    // send to frontend
    return res
      .status(202)
      .json({ messgae: "Login successful", data: loggedInUser });
  } catch (error) {
    console.log("Error in User login ", error);
    res.status(500).json(error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword.trim())
      return res.status(400).json("New password required");
    const hash = await bcrypt.hash(newPassword, 10);
    const user = await User.findByIdAndUpdate(req.user._id, { password: hash });
    return res.status(200).json("Password updated successfully");
  } catch (error) {
    console.error("Error in change password ", error);
    return res.status(500).json(error.message);
  }
};

module.exports = { registerUser, logInUser, changePassword };
