const {
  members: membersWS,
  movies: moviesWS,
  subscriptions: subscriptionsWS,
} = require("../models/subscriptions-ws");

async function getAllMovies(search) {
  const movies = await moviesWS.get();
  const members = await membersWS.get();
  const subscriptions = await subscriptionsWS.get();

  subscriptions.forEach((subscription) => {
    subscription.movies.forEach((subscriptionMovie) => {
      const index = movies.findIndex(
        (movie) => movie._id == subscriptionMovie._id
      );

      const member = members.find((member) => member._id == subscription._id);
      member.watchDate = subscriptionMovie.date;

      movies[index].subscriptions =
        "subscriptions" in movies[index]
          ? [...movies[index].subscriptions, member]
          : [member];
    });
  });

  if (search != null)
    return movies.filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase())
    );

  return movies;
}

async function deleteMovie(id) {
  const subscriptions = await subscriptionsWS.get();

  subscriptions.forEach(async (subscription) => {
    const movies = subscription.movies.filter((movie) => movie._id != id);

    if (movies.length !== subscription.movies.length)
      await subscriptionsWS.put(subscription._id, { ...subscription, movies });
  });

  await moviesWS.delete(id);
}

module.exports = { getAll: getAllMovies, delete: deleteMovie };
