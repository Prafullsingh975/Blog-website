const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment",commentSchema);

module.exports = Comment;