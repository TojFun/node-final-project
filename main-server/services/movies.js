const {
  members: membersWS,
  movies: moviesWS,
  subscriptions: subscriptionsWS,
} = require("../models/subscriptions-ws");

const getMovie = (id) => moviesWS.get(id);

async function getAllMovies(search) {
  const movies = await moviesWS.get();

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
