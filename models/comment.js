var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  text: { type: String, required: true },
  timestamp: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  user: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

// Virtual for comment's URL
CommentSchema.virtual("url").get(function () {
  return "/comments/" + this._id;
});

// Virtual for formatted timestamp
CommentSchema.virtual("timestamp_formatted").get(() => {
  return this.timestamp
    ? DateTime.fromJSDate(this.timestamp).toLocaleString(
        DateTime.DATETIME_SHORT
      )
    : "";
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
