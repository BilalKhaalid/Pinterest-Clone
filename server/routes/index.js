var express = require("express");
var router = express.Router();
const UserModel = require("../models/User");
const PostModel = require("../models/Post");
const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("../multer");
passport.use(new localStrategy(UserModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/profile", isLoggedIn, async (req, res) => {
  const user = await UserModel.findOne({
    username: req.session.passport.user,
  }).populate("posts");
  res.render("profile", { user });
});

router.get("/feed", isLoggedIn, (req, res) => {
  res.render("feed");
});

router.get("/login", (req, res) => {
  const error = req.flash("error");
  res.render("login", { error: error });
});

router.post("/register", async (req, res) => {
  const { username, email, fullName } = req.body;
  const userData = new UserModel({ username, email, fullName });

  UserModel.register(userData, req.body.password).then(() => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
});

router.get("/delete", async (req, res) => {
  const user = await UserModel.findOneAndDelete({
    username: req.session.passport.user,
  });
  res.send(user).redirect("/");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {}
);

router.post("/upload", isLoggedIn, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.send("No files were uploaded");
  } else {
    const user = await UserModel.findOne({
      username: req.session.passport.user,
    });
    const post = await PostModel.create({
      image: req.file.filename,
      imageText: req.body.imageText,
      user: user._id,
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
