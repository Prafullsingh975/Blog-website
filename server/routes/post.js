const express = require("express");
const { isLoggedIn } = require("../middleware/auth");
const { createPost } = require("../controllers/post");
const upload = require("../middleware/multer");
const router  = express.Router();

router.post('/create',isLoggedIn,upload.single('img'),createPost);
router.patch('/like',isLoggedIn,)

module.exports = router