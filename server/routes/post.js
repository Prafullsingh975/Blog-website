const express = require("express");
const { isLoggedIn } = require("../middleware/auth");
const { createPost, likePost, showAllPost, showUserAllPost } = require("../controllers/post");
const upload = require("../middleware/multer");
const router  = express.Router();

router.post('/create',isLoggedIn,upload.single('img'),createPost);
router.patch('/like',isLoggedIn,likePost);
router.get('/all',isLoggedIn,showAllPost)
router.get('/my-feed',isLoggedIn,showUserAllPost)

module.exports = router