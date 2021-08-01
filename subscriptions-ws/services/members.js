const {
  movies: moviesDB,
  members: membersDB,
  subscriptions: subscriptionsDB,
} = require("../models/mongoSetup");

exports.getAll = async () => {
  const members = await membersDB.get({});
  const subscriptions = await subscriptionsDB.get({});

  for (const subscription of subscriptions) {
    const index = members.findIndex(
      (member) => member._id.toString() === subscription.memberID
    );

    members[index].subscriptions = {
      _id: subscription._id,
      movies: await Promise.all(
        subscription.movies.map(async (movie) => {
          return {
            ...movie._doc,
            name: (await moviesDB.get({ _id: movie.movieID }))[0]?.name,
          };
        })
      ),
    };
  }

  return members;
};

exports.create = async (member) => {
  const { _id } = await membersDB.post(member);

  await subscriptionsDB.post({ memberID: _id, movies: [] });
};
