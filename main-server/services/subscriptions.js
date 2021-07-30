const {
  subscriptions: subscriptionsWS,
} = require("../models/subscriptions-ws");

const createSubscription = (subscription) => subscriptionsWS.post(subscription);

const subscribe = async (subscriptionID, movie) => {
  const { movies } = await subscriptionsWS.get(subscriptionID);

  await subscriptionsWS.put(subscriptionID, { movies: [...movies, movie] });
};

module.exports = { create: createSubscription, subscribe };
