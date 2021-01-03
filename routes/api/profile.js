const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

// @route    GET api/profile/me
// @desc     Get user profile Route
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There's no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile
// @desc     Get all profiles Route
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile)
      return res.status(400).json({ msg: "There isno profile for this user" });

    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: " profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_name
// @desc     Get profile by user_name
// @access   Public
router.get("/user/:user_name", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user.name,
    }).populate("user", ["name", "avatar"]);
    if (!profile)
      return res.status(400).json({ msg: "There isno profile for this user" });

    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: " profile not found" });
    }
    res.status(500).send("Server Error");
  }
});


// @route    DELETE api/profile
// @desc     Delete profile user &  user Post Route
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {

    //Remove user post 
    // await Post.deleteMany({ user: req.user.id })

    //Remove Proifle
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});







module.exports = router;
