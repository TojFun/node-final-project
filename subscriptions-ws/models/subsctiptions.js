const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  memberID: String,
  movies: Array,
});

module.exports = mongoose.model(
  "subscriptions",
  SubscriptionSchema,
  "subscriptions"
);
