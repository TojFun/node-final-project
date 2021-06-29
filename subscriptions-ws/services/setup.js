const moviesAPI = require("../models/moviesAPI");
const membersAPI = require("../models/membersAPI");

const {
  movies: MoviesDB,
  members: MembersDB,
} = require("../models/mongoSetup");

async function setupDB(db, objects, getNewObject) {
  await objects.forEach(async (object) => {
    await db.post(getNewObject(object));
  });
}

module.exports = async () => {
  const movies = await moviesAPI.getAll();
  const members = await membersAPI.getAll();

  try {
    await setupDB(MoviesDB, movies, (obj) => {
      return {
        name: obj.name,
        genres: obj.genres,
        image: obj.image.original,
        premiered: new Date(obj.premiered),
      };
    });

    await setupDB(MembersDB, members, (obj) => {
      return { name: obj.name, email: obj.email, city: obj.address.city };
    });
  } catch (error) {
    throw error;
  }
};
