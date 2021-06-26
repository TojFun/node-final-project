const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: String,
  genres: Array,
  image: String,
  premiered: Date,
});

module.exports = mongoose.model("movies", MovieSchema, "movies");
