var express = require("express");
var router = express.Router();
const UserModel = require("../models/User");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(UserModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

router.get("/feed", isLoggedIn, (req, res) => {
  res.render("feed");
});

router.get("/login", (req, res) => {
  res.render("login");
});

// router.post("/login", async (req, res) => {

// });

router.post("/register", async (req, res) => {
  const { username, email, fullName } = req.body;
  const userData = new UserModel({ username, email, fullName });

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
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

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
