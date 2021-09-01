const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    published: { type: Boolean, required: true },
    timestamp: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  opts
);

PostSchema.virtual("url").get(() => {
  return "/posts/" + this._id;
});

PostSchema.virtual("timestamp_formatted").get(() => {
  return this.timestamp
    ? DateTime.fromJSDate(this.timestamp).toLocaleString(
        DateTime.DATETIME_SHORT
      )
    : "";
});

module.exports = mongoose.model("Post", PostSchema);
