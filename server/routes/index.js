var express = require("express");
var router = express.Router();
const UserModel = require("../models/users");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.authenticate(new localStrategy(UserModel.authenticate));

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register", async (req, res) => {
  const { username, email, fullname } = req.body;
  const userData = new UserModel({
    username,
    email,
    fullname,
  });
  UserModel.register(userData, req.body.password).then(() => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  (req, res) => {}
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.send("Profile Page");
});

module.exports = router;
