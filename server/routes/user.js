const express = require("express");
const { registerUser, logInUser } = require("../controllers/user.js");
const router = express.Router();

router.post("/register",registerUser );
router.post("/login",logInUser);


module.exports = router;
