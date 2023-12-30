const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true,
  },
  currentDateAndTime: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);
