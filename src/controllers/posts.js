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

exports.destroy = {
  post: (req, res) => {
    res.send("Not implemented: delete post from db");
  },
};
