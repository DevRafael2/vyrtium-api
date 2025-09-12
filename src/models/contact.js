const mongoose = require("mongoose");

const Contact = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  celphone: {
    type: Number,
    requried: true
  }
});

module.exports = mongoose.model("contacts", Contact);