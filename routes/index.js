const express = require("express");
const router = express.Router();
const { verifyAuthenticated, verifyGuest } = require("../middleware/auth");
const { formatDate } = require("../helpers/helper");

const Story = require("../models/Story");

// @desc Home login page
// @route GET /
router.get("/", verifyGuest, (req, res) => {
  res.render("pages/login");
});

// @desc Loggedin Dashboard page
// @route GET /dashboard
router.get("/dashboard", verifyAuthenticated, async (req, res) => {
  try {
    // find User's stories
    const stories = await Story.find({ user: req.user.id }).lean();
    // console.log(stories);
    stories.forEach((story) => {
      story.createdAt = formatDate(story.createdAt);
    });
    res.render("pages/dashboard", { name: req.user.firstName, stories });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
