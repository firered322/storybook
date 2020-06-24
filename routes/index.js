const express = require("express");
const router = express.Router();
const { verifyAuthenticated, verifyGuest } = require("../middleware/auth");

// @desc Home login page
// @route GET /
router.get("/", verifyGuest, (req, res) => {
  res.render("pages/login");
});

// @desc Loggedin Dashboard page
// @route GET /dashboard
router.get("/dashboard", verifyAuthenticated, (req, res) => {
  res.render("pages/dashboard");
});

module.exports = router;
