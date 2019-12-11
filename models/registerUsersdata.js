const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  loggedInTime: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  loggedOutTime: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  message: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  ip_address: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  location: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  pageViewCount: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  }
});

const events = mongoose.model("events", eventsSchema);

module.exports = events;
