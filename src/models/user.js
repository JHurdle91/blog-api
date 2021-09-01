const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };
const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  opts
);

UserSchema.virtual("url").get(() => {
  return "/users/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);
