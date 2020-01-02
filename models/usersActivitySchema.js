const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String
  },
  activeUsers: {
    type: Number,
    default: 0
  },

  visitors: {
    type: Number,
    default: 0
  },
  totalViews: {
    type: Number,
    default: 0
  },
  other: {
    type: Number
  },
  firefox: {
    type: Number
  },
  chrome: {
    type: Number
  }
});

const activity = mongoose.model("activity", userSchema);

module.exports = activity;
