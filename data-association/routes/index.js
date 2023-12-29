var express = require("express");
var router = express.Router();
const UserModel = require("./users");
const PostModel = require("./posts");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/create", async function (req, res, next) {
  const User = await UserModel.create({
    username: "Bilal",
    password: "Khalid",
    email: "bilalkhalid@gmail.com",
    posts: [],
    fullname: "Muhammad Bilal Khalid",
  });
  res.send(User);
});

router.get("/post", async function (req, res, next) {
  const Post = await PostModel.create({
    postText: "This is third post",
    user: "658eb465bc6ede561eb3ad24",
  });
  const user = await UserModel.findOne({ _id: "658eb465bc6ede561eb3ad24" });
  // ! By doing this we are pushing/adding createdPost's id into the posts array in the User document
  user.posts.push(Post._id);
  await user.save();
  res.send(Post);
});

router.get("/allposts", async (req, res) => {
  const all_posts_of_user = await UserModel.find({
    // ! There's a problem by this we will get only the posts ids which is good but adds a step to search for posts individually So we use populate(name_of_field) method to populate the field
    _id: "658eb465bc6ede561eb3ad24",
  }).populate("posts");
  res.send(all_posts_of_user);
});

module.exports = router;
