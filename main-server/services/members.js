const {
  members: membersWS,
  subscriptions: subscriptionsWS,
} = require("../models/subscriptions-ws");

const getMovie = async (id) => (await moviesWS.get(id))[0];

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

function createMovie(movie) {
  movie.genres = movie.genres.split(/[ ,]+/);

  return moviesWS.post(movie);
}

function updateMovie(id, movie) {
  movie.genres = movie.genres.split(/[ ,]+/);

  return moviesWS.put(id, movie);
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

module.exports = {
  get: getMovie,
  getAll: getAllMovies,

  create: createMovie,
  update: updateMovie,

  delete: deleteMovie,
};
