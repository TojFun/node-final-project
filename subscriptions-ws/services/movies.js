const {
  movies: moviesDB,
  members: membersDB,
  subscriptions: subscriptionsDB,
} = require("../models/mongoSetup");

exports.getAll = async () => {
  const movies = await moviesDB.get({});
  const subscriptions = await subscriptionsDB.get({});
  const members = await membersDB.get({});

  for (const subscription of subscriptions) {
    for (const subscriptionMovie of subscription.movies) {
      const index = movies.findIndex(
        (movie) => movie._id == subscriptionMovie._id.toString()
      );

      const member = {
        memberID: subscription.memberID,
        name: members.find(
          ({ _id }) => _id.toString() === subscription.memberID
        ).name,
        watchDate: subscriptionMovie.date,
      };

      movies[index].subscriptions =
        "subscriptions" in movies[index]
          ? [...movies[index].subscriptions, member]
          : [member];
    }
  }

  return movies;
};
