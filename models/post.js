var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  published: { type: Boolean, required: true },
  timestamp: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual for post's URL
PostSchema.virtual("url").get(function () {
  return "/posts/" + this._id;
});

// Virtual for formatted timestamp
PostSchema.virtual("timestamp_formatted").get(() => {
  return this.timestamp
    ? DateTime.fromJSDate(this.timestamp).toLocaleString(
        DateTime.DATETIME_SHORT
      )
    : "";
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
