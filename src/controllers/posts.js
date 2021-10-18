var Post = require("../models/post");
var User = require("../models/user");

exports.index = {
  get: (req, res, next) => {
    /* send list of all posts */
    Post.find().exec((err, list_posts) => {
      if (err) return next(err);
      res.json(list_posts);
    });
  },
};

exports.create = {
  post: (req, res) => {
    res.send("Not implemented: add post to db");
  },
};

exports.id = {
  get: (req, res, next) => {
    /* send post */
    Post.findById(req.params.id)
      .populate("user")
      .exec((err, post) => {
        if (err) return next(err);
        res.json(post);
      });
  },
};

exports.update = {
  post: (req, res) => {
    res.send("Not implemented: update post in db");
  },
};

exports.published = {
  get: (req, res, next) => {
    // return whether post is published.
    Post.findById(req.params.id)
      .populate("user")
      .exec((err, post) => {
        if (err) return next(err);
        res.json(post.published);
      });
  },
  post: (req, res, next) => {
    // toggle "published" property of post
    Post.findById(req.params.id).exec((err, post) => {
      if (err) return next(err);
      Post.findByIdAndUpdate(
        post._id,
        { published: !post.published },
        (err) => {
          if (err) return next(err);
          res.json();
        }
      );
    });
  },
};

exports.delete = {
  post: (req, res, next) => {
    Post.findByIdAndRemove(req.params.id, (err) => {
      if (err) return next(err);
      res.json();
    });
  },
};
