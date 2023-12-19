var express = require("express");
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(plm);

module.exports = mongoose.model("Users", UserSchema);
