const router = require("express").Router();
const { movies } = require("../models/mongoSetup");

const { getAll } = require("../services/movies");

const setupDBRoute = require("../services/setupDBRoute");

router.get("/", async (req, res) => {
  try {
    const data = await getAll();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

setupDBRoute(router, movies);

module.exports = router;
