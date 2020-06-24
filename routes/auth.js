const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc Google Authentication
// @route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc Google Auth Callback
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @desc Logout user
// @route GET /auth./logout
router.get("/logout", (req, res) => {
  // with passport m/w when we login , we get a logout method on the req object
  req.logout();
  res.redirect("/");
});

module.exports = router;
