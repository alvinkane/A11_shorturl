const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortenSchema = new Schema({
  URL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Shorten", shortenSchema);
