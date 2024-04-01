const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, min: 8, trim: true },
  gender: { type: String, enum: ["m", "f", "t"], lowercase: true },
  profile: { type: String },
  userName: { type: String, required: true, lowercase: true }, //Generated on backend
  age:{type:Number},
  posts:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}]
},{timestamps:true});

const User = mongoose.model("User",userSchema);

module.exports = User