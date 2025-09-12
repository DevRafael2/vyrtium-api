const mongoose = require("mongoose");

const Rol = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("roles", Rol);