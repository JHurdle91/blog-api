var Post = require("../models/post");

exports.index = {
  get: (req, res) => {
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
  get: (req, res) => {
    res.send("Not implemented: send post json");
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
