const express = require("express");
const { registerUser, logInUser, changePassword } = require("../controllers/user.js");
const upload = require("../middleware/multer.js");
const { isLoggedIn } = require("../middleware/auth.js");
const router = express.Router();

router.post("/register",upload.single("profile"),registerUser );
router.patch('/change-password',isLoggedIn,changePassword);
router.post("/login",logInUser);


module.exports = router;
