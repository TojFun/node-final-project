const mongoose = require("mongoose");
const MongoDB = require("../../models/mongoDB");

const users = new MongoDB(mongoose, "users", {
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = users;
