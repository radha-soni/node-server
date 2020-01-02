const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  loggedInTime: [String],
  loggedOutTime: [String],
  ip_address: [String],
  location: [String],
  message: [String],
  platform: [String],
  pageViewCount: Number,
  loggedIn: Boolean,
  totalViews: Number
});

const events = mongoose.model("events", eventsSchema);

module.exports = events;
