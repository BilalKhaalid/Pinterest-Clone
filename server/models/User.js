const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/pinterest");

// Define User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  dp: {
    type: String, // Assuming that the DP (display picture) is a URL or a file path
  },
  fullName: {
    type: String,
  },
});

userSchema.plugin(plm);

module.exports = mongoose.model("Users", userSchema);
