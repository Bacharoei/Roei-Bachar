const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");


// @route    POST api/posts
// @desc     Create a post Route
// @access   Private
router.post(
  "/",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
    
      const newPost = new Post({
        text: req.body.text,
        recevier: req.body.recevier,
        subject:  req.body.subject,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);



// @route    GET api/posts
// @desc     Get all posts &
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// // @route    GET api/posts/:id
// // @desc     Get post by ID
// // @access   Private
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ msg: "Post not found" });

//     res.json(post);
//   } catch (err) {
//     if (err.kind === "ObjectId") {
//       return res.status(400).json({ msg: " post not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// @route    Delete api/posts
// @desc     Delete post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if post exists
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    //check the user
    if (post.user.toString() === req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    await post.remove();

    res.json({ msg: "post deleted" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: " post not found" });
    }
    res.status(500).send("Server Error");
  }
});


// @route    POST api/posts
// @desc     Create a post Route
// @access   Private
router.post(
  "/:user_id/",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // const post = await Post.findById(req.params.id).select("-password");
      const user = await User.findById(req.user.id).select("-password");
    
      const newPost = new Post({
        text: req.body.text,
        recevier: req.body.recevier,
        subject:  req.body.subject,
        name: user.name,
        avatar: user.avatar,
        user: req.body.recevier,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.log(err)
      res.status(500).send("Server Error");
    }
  }
);


// @route    GET api/posts/:id
// @desc     Get post by user 
// @access   Private
router.get("/users/:id", auth, async (req, res) => {
  try {
  const user = await User.findById(req.params.id);
  const post = await Post.find({user: req.params.id}).sort({ date: -1 }); 

  if (!user){
    return res.status(404).json({ msg: "user not found" });

  }

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

    res.json(post);
  } catch (err) {

    console.log(err)
    res.status(500).send("Server Error");
  }
});

// @route    Delete api/posts/:id
// @desc     Get post by ID
// @access   Private
router.delete("/users/:user_id/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);


    if (!post) return res.status(404).json({ msg: "Post not found" });

    //check the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    await post.remove();


    res.json({msg: " post removed"});
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: " post not found" });
    }
    res.status(500).send("Server Error");
  }
});


module.exports = router;
