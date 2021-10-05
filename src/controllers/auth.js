const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const passport = require("../auth/passport");
const User = require("../models/user");
const Role = require("../models/role");

exports.signin = {
  post: (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err) return next(err);
      if (!user) {
        return res.status(400).json({
          message: "Incorrect username or password",
          user: user,
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) res.send(err);

        const { JWT_SECRET } = process.env;
        const token = jwt.sign(user.toJSON(), JWT_SECRET, {
          expiresIn: 86400, // 24 hours
        });
        User.findById(user._id)
          .populate("roles", "name")
          .exec((err, userWithRoles) => {
            if (err) return next(err);
            return res.json({ user: userWithRoles, token });
          });
      });
    })(req, res);
  },
};

exports.signup = {
  post: (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({
      username: username,
    }).exec((err, foundUser) => {
      if (err) return next(err);
      if (foundUser) {
        return res
          .status(400)
          .send({ message: "Sorry, that user name is taken!" });
      } else {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) return next(err);

          const userDetail = {
            username,
            password: hashedPassword,
            roles: [],
          };

          const user = new User(userDetail);
          user.save((err) => {
            if (err) return next(err);
          });
        });
        return res.json();
      }
    });
  },
};
