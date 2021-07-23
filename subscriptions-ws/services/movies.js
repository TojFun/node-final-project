const {
  movies: moviesDB,
  members: membersDB,
  subscriptions: subscriptionsDB,
} = require("../models/mongoSetup");

exports.getAll = async () => {
  const movies = await moviesDB.get({});
  const subscriptions = await subscriptionsDB.get({});

  await subscriptions.forEach(async (subscription) => {
    await subscription.movies.forEach(async (subscriptionMovie) => {
      console.log(subscriptionMovie);
      const index = movies.findIndex(
        (movie) => movie._id == subscriptionMovie._id.toString()
      );

      const member = await membersDB.get({ _id: subscription.memberID });
      member.watchDate = subscriptionMovie.date;

      movies[index].subscriptions =
        "subscriptions" in movies[index]
          ? [...movies[index].subscriptions, member]
          : [member];
    });
  });

  return movies;
};
