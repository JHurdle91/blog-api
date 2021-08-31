var Comment = require("../models/comment");

exports.index = {
  get: (req, res, next) => {
    /* send list of comments */
    Comment.find({ post: req.postId })
      .populate("user")
      .exec((err, list_comments) => {
        if (err) return next(err);
        res.json(list_comments);
      });
  },
};

exports.create = {
  post: (req, res) => {
    res.send("Not implemented: add comment to db");
  },
};

exports.id = {
  get: (req, res) => {
    res.send("Not implemented: send comment json");
  },
};

exports.update = {
  post: (req, res) => {
    res.send("Not implemented: update comment in db");
  },
};

exports.destroy = {
  post: (req, res) => {
    res.send("Not implemented: delete comment from db");
  },
};
