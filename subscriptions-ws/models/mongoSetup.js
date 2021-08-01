const mongoose = require("mongoose");
const MongoDB = require("../../models/mongoDB");

const movies = new MongoDB(mongoose, "movies", {
  name: { type: String, required: true },
  genres: { type: [String], required: true },
  image: { type: String, required: true },
  premiered: { type: Date, required: true },
});

const members = new MongoDB(mongoose, "members", {
  name: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
});

const subscriptions = new MongoDB(mongoose, "subscriptions", {
  memberID: { type: String, required: true },
  movies: {
    type: [
      {
        movieID: { type: mongoose.Types.ObjectId, required: true },
        watchDate: { type: Date, required: true },
      },
    ],
    required: true,
  },
});

module.exports = { movies, members, subscriptions };
