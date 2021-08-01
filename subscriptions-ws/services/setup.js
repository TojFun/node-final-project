const moviesAPI = require("../models/moviesAPI");
const membersAPI = require("../models/membersAPI");

const {
  movies: moviesDB,
  members: membersDB,
  subscriptions: subscriptionsDB,
} = require("../models/mongoSetup");

async function setupDB(db, objects, getNewObject) {
  for (const object of objects) {
    await db.post(getNewObject(object));
  }
}

module.exports = async () => {
  console.log("Setting Up");

  try {
    const movies = await moviesAPI.getAll();
    const members = await membersAPI.getAll();

    for (const {
      name,
      genres,
      image: { medium: image },
      premiered,
    } of movies) {
      await moviesDB.post({
        name,
        genres,
        image,
        premiered: new Date(premiered),
      });
    }

    for (const {
      name,
      email,
      address: { city },
    } of members) {
      const { _id: memberID } = await membersDB.post({ name, email, city });
      await subscriptionsDB.post({ memberID, movies: [] });
    }
  } catch (error) {
    return console.error("Error: " + error.message);
  }

  console.log("Done");
};
