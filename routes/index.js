const express = require("express");
const router = express.Router();

// @desc Home login page
// @route GET /
router.get("/", (req, res) => {
  res.render("pages/login");
});

// @desc Loggedin Dashboard page
// @route GET /dashboard
router.get("/dashboard", (req, res) => {
  res.render("pages/dashboard");
});

module.exports = router;
