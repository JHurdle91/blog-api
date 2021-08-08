#! /usr/bin/env node

console.log(
  "This script populates some test users, posts, and comments to your database.\n" +
    "Specified database in .env file - e.g.: mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

var User = require("./src/models/user");
var Post = require("./src/models/post");
var Comment = require("./src/models/comment");

var async = require("async");
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

function userCreate(username, password, callback) {
  userDetail = {
    username,
    password,
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
}

function postCreate(title, text, published, timestamp, user, callback) {
  postDetail = {
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
  commentDetail = {
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

function createUsers(callback) {
  async.parallel(
    [
      (callback) => {
        userCreate("admin", "pass", callback);
      },
      (callback) => {
        userCreate("user1", "pass1", callback);
      },
      (callback) => {
        userCreate("user2", "pass2", callback);
      },
      (callback) => {
        userCreate("user3", "pass3", callback);
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
          (published = true),
          Date.now(),
          users[0]._id,
          callback
        );
      },
      (callback) => {
        postCreate(
          "This is another Title",
          "This is the body of an unpublished blog post.",
          (published = false),
          Date.now(),
          users[1]._id,
          callback
        );
      },
      (callback) => {
        postCreate(
          "This is Technically a Title",
          "This is technically the body of the blog post.",
          (published = true),
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

async.series([createUsers, createPosts, createComments], (err, results) => {
  if (err) {
    console.log("FINAL ERR: " + err);
  } else {
    console.log({ users, posts, comments });
  }
  mongoose.connection.close();
});
