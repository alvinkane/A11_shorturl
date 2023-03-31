const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortenSchema = new Schema({
  URL: {
    trpe: String,
    required: true,
  },
});

module.exports = mongoose.model("Shorten", shortenSchema);
