const mongoose = require("mongoose");

module.exports = mongoose.model("Activity", new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  site: String,
  duration: Number,
  date: { type: Date, default: Date.now }
}));
