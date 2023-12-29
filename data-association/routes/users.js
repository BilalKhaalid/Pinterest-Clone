const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/data-association");

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
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  dp: {
    type: String, // Assuming that the DP (display picture) is a URL or a file path
  },
  fullname: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
