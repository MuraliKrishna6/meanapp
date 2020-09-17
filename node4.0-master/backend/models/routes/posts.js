const express = require('express');
const router = express.Router();
const Post = require('../post');
const User = require('../user');
const checkAuth = require("../check-auth");


router.post("", checkAuth, (req, res, next) => {

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  })
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'post added success fully',
      postId: createdPost._id,
    })
  }).catch(error => {
    res.status(500).json({
      message: "Created a post failed"
    })
  })
})


router.get("", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'post fetched succefully',
      posts: documents,
    });
  }).catch(error => {
    res.status(500).json({ message: "Fetching posts failed" })
  })
});


router.put("/:id", checkAuth, (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId,
  })
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Updated successfully" });
    } else {
      res.status(401).json({ message: "Not authorized" })
    }
  }).catch(error => {
    res.status(500).json({ message: 'Could not update post!' })
  })
})

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    }
    else {
      res.status(404).json({ message: "Post not found" });
    }
  }).catch(error => {
    res.status(500).json({ message: "post not found" })
  })
})

router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Deleted successfully" });
    } else {
      res.status(401).json({ message: "Not authorized" })
    }
  }).catch(error => {
    res.status(500).json({ message: "Fetching post failed" })
  })
})

module.exports = router;