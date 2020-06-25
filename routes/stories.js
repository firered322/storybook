const express = require("express");
const router = express.Router();
const { verifyAuthenticated } = require("../middleware/auth");

const Story = require("../models/Story");

// @desc Story add page
// @route GET /stories
router.get("/", verifyAuthenticated, (req, res) => {
  res.render("stories/add");
});

// @desc process add form
// @route POST /stories
router.post("/", verifyAuthenticated, async (req, res) => {
  try {
    // add the user to the req.body field where the form data is stored
    req.body.user = req.user.id;
    const story = await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
