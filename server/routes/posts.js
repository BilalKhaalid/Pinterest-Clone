const mongoose = require("mongoose");

// Define Post Schema
const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
  // Assuming you have a User model, linking the post to an author
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Create Post model
const Post = mongoose.model("Post", postSchema);

// Export Post model
module.exports = Post;
