exports.create = {
  get: (req, res) => {
    res.send("Not implemented: display 'create post' form");
  },
  post: (req, res) => {
    res.send("Not implemented: add post to db");
  },
};

exports.id = {
  get: (req, res) => {
    res.send("Not implemented: display post");
  },
};

exports.update = {
  get: (req, res) => {
    res.send("Not implemented: display 'update post' form");
  },
  post: (req, res) => {
    res.send("Not implemented: update post in db");
  },
};

exports.destroy = {
  get: (req, res) => {
    res.send("Not implemented: display 'delete post' form");
  },
  post: (req, res) => {
    res.send("Not implemented: delete post from db");
  },
};
