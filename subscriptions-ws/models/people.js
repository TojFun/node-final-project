const mongoose = require("mongoose");

const PeopleSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("peoples", PeopleSchema, "peoples");
