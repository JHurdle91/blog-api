const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/user");

passport.use(
  new LocalStrategy((username, password, callback) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return callback(err);
      if (!user)
        return callback(null, false, { message: "Incorrect username" });
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return callback(err);
        if (res) {
          return callback(null, user, { message: "Logged In Successfully" });
        } else {
          return callback(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

const { JWT_SECRET } = process.env;
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (jwtPayload, callback) => {
      return User.findOneById(jwtPayload.id, (err, user) => {
        if (err) return callback(err);
        return callback(null, user);
      });
    }
  )
);

module.exports = passport;
