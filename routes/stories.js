const express = require("express");
const router = express.Router();
const { verifyAuthenticated } = require("../middleware/auth");

const Story = require("../models/Story");

// @desc Story add page
// @route GET /
router.get("/", verifyAuthenticated, (req, res) => {
  res.render("stories/add");
});

module.exports = router;
