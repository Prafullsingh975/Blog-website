const express = require("express");
const { isLoggedIn } = require("../middleware/auth");
const { createPost } = require("../controllers/post");
const router  = express.Router();

router.post('/create',isLoggedIn,createPost)

module.exports = router