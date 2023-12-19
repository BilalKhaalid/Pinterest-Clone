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
  ], // Assuming you have a Post model
  fullName: {
    type: String,
    required: true,
  },
});

// Create User model
const User = mongoose.model("User", userSchema);

// Export User model
module.exports = User;
