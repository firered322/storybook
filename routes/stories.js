const express = require("express");
const router = express.Router();
const { verifyAuthenticated } = require("../middleware/auth");
const { truncate, stripTags, editIcon } = require("../helpers/helper");

const Story = require("../models/Story");

// @desc Story add page
// @route GET /stories/add
router.get("/add", verifyAuthenticated, (req, res) => {
  res.render("stories/add");
});

// @desc process add story form
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

// @desc Show all stories
// @route GET /stories
router.get("/", verifyAuthenticated, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({
        createdAt: "desc",
      })
      .lean();

    stories.forEach((story) => {
      story.body = truncate(stripTags(story.body), 20);
      // story's user: story.user
      // logged in user: req.user
      story.editBody = editIcon(story.user, req.user, story._id);
    });
    res.render("stories/index", { stories });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc Story edit page
// @route GET /stories/edit/:id
router.get("/edit/:id", verifyAuthenticated, async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id }).lean();
  if (!story) {
    return res.render("error/404");
  }
  if (story.user != req.user.id) {
    res.redirect("/stories");
  } else {
    res.render("stories/edit", {
      story,
    });
  }
});

module.exports = router;
