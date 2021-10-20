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
  post: (req, res, next) => {
    const postDetail = {
      user: req.body.params.userId,
      title: req.body.params.title,
      text: req.body.params.body,
      published: req.body.params.published,
      timestamp: Date.now(),
    };
    const post = new Post(postDetail);
    post.save((err) => {
      if (err) return next(err);
      res.json(post);
    });
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
  post: (req, res, next) => {
    Post.findById(req.params.id).exec((err, post) => {
      if (err) return next(err);
      Post.findByIdAndUpdate(
        post._id,
        {
          title: req.body.params.title,
          text: req.body.params.body,
          published: req.body.params.published,
        },
        (err) => {
          if (err) return next(err);
          res.json();
        }
      );
    });
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
