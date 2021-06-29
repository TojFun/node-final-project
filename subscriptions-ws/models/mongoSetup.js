const MongoDB = require("../../models/mongoDB");

const movies = new MongoDB("movies", {
  name: { type: String, required: true },
  genres: { type: Array, required: true },
  image: { type: String, required: true },
  premiered: { type: Date, required: true },
});

const members = new MongoDB("members", {
  name: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
});

const subscriptions = new MongoDB("subscriptions", {
  memberID: { type: String, required: true },
  movies: { type: Array, required: true },
});

module.exports = { movies, members, subscriptions };
