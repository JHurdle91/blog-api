const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true },
  timestamp: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

CommentSchema.virtual("url").get(() => {
  return "/comments/" + this._id;
});

CommentSchema.virtual("timestamp_formatted").get(() => {
  return this.timestamp
    ? DateTime.fromJSDate(this.timestamp).toLocaleString(
        DateTime.DATETIME_SHORT
      )
    : "";
});

module.exports = mongoose.model("Comment", CommentSchema);
