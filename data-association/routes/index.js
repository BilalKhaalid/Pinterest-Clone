var express = require("express");
var router = express.Router();
const User = require("./users");
const Post = require("./posts");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/createuser", async (req, res) => {
  const createdUser = await User.create({
    username: "Bilal",
    password: "khalid",
    posts: [],
    email: "bilalkhalid@gmail.com",
    fullName: "Muhammad Bilal Khalid",
  });
  res.send(createdUser);
});

router.get("/createpost", async (req, res) => {
  let createdPost = await Post.create({
    postText: "Oyeee!",
    // user: "658140ca1317e4aeb5f891e7",
  });
  const userId = "658143c72880249d44554bfa"; // Replace with the actual user ID
  const user = await User.findById(userId);
  user.posts.push(createdPost._id);
  await user.save();
  res.send("Done");
});

router.get("/allposts", async (req, res) => {
  const userId = "658143c72880249d44554bfa";
  let usersPosts = await User.findById(userId)
    // ! It is used to add real data instead of ids
    .populate("posts");
  res.send(usersPosts);
});

module.exports = router;
