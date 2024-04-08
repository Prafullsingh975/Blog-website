const Post = require("../models/post.js");
const User = require("../models/user");

const createPost = async (req, res) => {
  try {
    // Destructure
    const { title, content } = req.body;
    // validation
    if (!title?.trim()) return res.status(400).json("Title is required");
    // craete post
    const newPost = await Post.create({
      title,
      content,
      createdBy: req.user._id,
    });
    const post = await Post.findById(newPost._id).populate({path:"createdBy",select:"firstName lastName"});
    const user = await User.findById(req.user._id);
    const posts = [...user.posts,newPost._id]; // [1,2,3,4,6]
    user.posts = posts;
    await user.save();

    // sending response to FE
    return res.status(201).json({ message: "Post created", data: post });
  } catch (error) {
    console.error("Error in post creation", error);
    return res.status(500).json(`Error in post creation ${error.message}`);
  }
};

module.exports = { createPost };
