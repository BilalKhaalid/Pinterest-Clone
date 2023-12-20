var express = require("express");
var router = express.Router();
const UserModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(UserModel.authenticate));

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
  try {
    const { username, email, password, fullname } = req.body;
    const userData = new UserModel({
      username,
      email,
      password,
      fullname,
    });
    console.log("Register route hit");
    // ... your registration logic ...

    await UserModel.register(userData, password);

    // If registration is successful, authenticate the user
    passport.authenticate("local")(req, res, () => {
      console.log("User authenticated");
      res.redirect("/profile");
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Internal Server Error");
  }
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
