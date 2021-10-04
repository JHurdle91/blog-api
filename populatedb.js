#! /usr/bin/env node

console.log(
  "This script populates some test users, posts, and comments to your database.\n" +
    "Specified database in .env file - e.g.: mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

var User = require("./src/models/user");
var Post = require("./src/models/post");
var Comment = require("./src/models/comment");
var Role = require("./src/models/role");

var async = require("async");
const bcrypt = require("bcryptjs");
require("dotenv").config();

var mongoose = require("mongoose");
var mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var users = [];
var posts = [];
var comments = [];
var roles = [];

function userCreate(username, password, roles, callback) {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return err;

    const userDetail = {
      username,
      password: hashedPassword,
      roles,
    };

    var user = new User(userDetail);
    user.save((err) => {
      if (err) {
        callback(err, null);
        return;
      }
      console.log("New User: " + user);
      users.push(user);
      callback(null, user);
    });
  });
}

function postCreate(title, text, published, timestamp, user, callback) {
  const postDetail = {
    title,
    text,
    published,
    timestamp,
    user,
  };

  var post = new Post(postDetail);

  post.save((err) => {
    if (err) {
      callback(err, null);
      return;
    }
    console.log("New Post: " + post);
    posts.push(post);
    callback(null, post);
  });
}

function commentCreate(text, timestamp, user, post, callback) {
  const commentDetail = {
    text,
    timestamp,
    user,
    post,
  };

  var comment = new Comment(commentDetail);

  comment.save((err) => {
    if (err) {
      callback(err, null);
      return;
    }
    console.log("New Comment: " + comment);
    comments.push(comment);
    callback(null, comment);
  });
}

function roleCreate(name, callback) {
  const role = new Role({ name });
  role.save((err) => {
    if (err) {
      callback(err, null);
      return;
    }
    console.log("New Role: " + role);
    roles.push(role);
    callback(null, role);
  });
}

function createUsers(callback) {
  async.parallel(
    [
      (callback) => {
        userCreate("admin", "pass", [roles[0]._id], callback);
      },
      (callback) => {
        userCreate("user1", "pass1", [], callback);
      },
      (callback) => {
        userCreate("user2", "pass2", [], callback);
      },
      (callback) => {
        userCreate("user3", "pass3", [], callback);
      },
    ],
    callback
  );
}

function createPosts(callback) {
  async.parallel(
    [
      (callback) => {
        postCreate(
          "This is a Title",
          "This is the body of the blog post.",
          true,
          Date.now(),
          users[0]._id,
          callback
        );
      },
      (callback) => {
        postCreate(
          "This is another Title",
          "This is the body of an unpublished blog post.",
          false,
          Date.now(),
          users[1]._id,
          callback
        );
      },
      (callback) => {
        postCreate(
          "This is Technically a Title",
          "This is technically the body of the blog post.",
          true,
          Date.now(),
          users[0]._id,
          callback
        );
      },
    ],
    callback
  );
}

function createComments(callback) {
  async.series(
    [
      (callback) => {
        commentCreate(
          "First!",
          Date.now(),
          users[0]._id,
          posts[0]._id,
          callback
        );
      },
      (callback) => {
        commentCreate(
          "not first :(",
          Date.now(),
          users[1]._id,
          posts[0]._id,
          callback
        );
      },
      (callback) => {
        commentCreate(
          "I'm just leaving a comment.",
          Date.now(),
          users[2]._id,
          posts[0]._id,
          callback
        );
      },
      (callback) => {
        commentCreate(
          "First again!",
          Date.now(),
          users[0]._id,
          posts[1]._id,
          callback
        );
      },
      (callback) => {
        commentCreate(
          "Great article...",
          Date.now(),
          users[2]._id,
          posts[1]._id,
          callback
        );
      },
    ],
    callback
  );
}

function createRoles(callback) {
  async.parallel(
    [
      (callback) => {
        roleCreate("ROLE_ADMIN", callback);
      },
      (callback) => {
        roleCreate("ROLE_MODERATOR", callback);
      },
    ],
    callback
  );
}

async.series([createRoles, createUsers, createPosts, createComments], (err) => {
  if (err) {
    console.log("FINAL ERR: " + err);
  } else {
    console.log({ users, posts, comments });
  }
  mongoose.connection.close();
});
