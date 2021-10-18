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
  post: (req, res, next) => {
    const commentDetail = {
      text: req.body.params.text,
      timestamp: Date.now(),
      user: req.body.params.userId,
      post: req.body.params.postId,
    };
    const comment = new Comment(commentDetail);
    comment.save((err) => {
      if (err) return next(err);
      res.redirect();
    });
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

exports.delete = {
  post: (req, res, next) => {
    Comment.findByIdAndRemove(req.params.commentId, (err) => {
      if (err) return next(err);
      res.json();
    });
  },
};
