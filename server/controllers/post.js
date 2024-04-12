const { cloudinaryUplaod } = require("../middleware/cloudinary.js");
const Post = require("../models/post.js");
const User = require("../models/user");

const createPost = async (req, res) => {
  try {
    // Destructure
    const { title, content } = req.body;
    // validation
    if (!title?.trim()) return res.status(400).json("Title is required");
    let response;
    if (req?.file?.path) {
      response = await cloudinaryUplaod(req.file.path);
    }
    // craete post
    const newPost = await Post.create({
      title,
      content,
      image: response ? response.url : "",
      createdBy: req.user._id,
    });
    const post = await Post.findById(newPost._id).populate({
      path: "createdBy",
      select: "firstName lastName",
    });
    const user = await User.findById(req.user._id);
    const posts = [...user.posts, newPost._id]; // [1,2,3,4,6]
    user.posts = posts;
    await user.save();

    // sending response to FE
    return res.status(201).json({ message: "Post created", data: post });
  } catch (error) {
    console.error("Error in post creation", error);
    return res.status(500).json(`Error in post creation ${error.message}`);
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) return res.status(400).json("Post id is required");

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json("Post not found");
    const likes = post.likes;
    const indexAt = likes?.findIndex(
      (elm) => String(elm) == String(req.user._id)
    );
    let message;
    if (indexAt >= 0) {
      likes.splice(indexAt, 1);
      message = "Dislike";
    } else {
      likes.push(req.user._id);
      message = "like";
    }

    post.likes = likes;
    await post.save();
    return res.status(200).json(message);
  } catch (error) {
    console.log("Error in post like", error);
    return res.status(500).json(error.message);
  }
};

const showAllPost = async (req, res) => {
  try {
    const allPosts = await Post.find({ createdBy: { $nin: req.user._id } });
    return res.status(200).json(allPosts);
  } catch (error) {
    console.log("Error in getting all posts", error);
    return res.status(500).json(error.message);
  }
};
const showUserAllPost = async (req, res) => {
  try {
    const allUserPosts = await Post.find({ createdBy: req.user._id });
    return res.status(200).json(allUserPosts);
  } catch (error) {
    console.log("Error in getting all posts", error);
    return res.status(500).json(error.message);
  }
};

module.exports = { createPost, likePost, showAllPost, showUserAllPost };
