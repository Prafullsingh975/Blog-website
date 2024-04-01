const mongoose = require("mongoose");


const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, max: 100 },
    content: String,
    image: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post",postSchema);

module.exports = Post;
