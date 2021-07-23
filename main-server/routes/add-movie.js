const express = require("express");
const router = express.Router();

const moviesBL = require("../services/movies");

router.use((req, res, next) => {
  if (!req.session.user.permissions.includes("Create Movies"))
    return res.redirect("/?status=no-permission");

  next();
});

// GET the "add movie" page:
router.get("/", async (req, res, next) => {
  const { error } = req.query;

  res.render("movie", {
    title: "Add Movie",
    name: req.session.user.firstName,
    movie: { _id: "add" },
    error,
  });
});

// POST new movie to the server:
router.post("/", async (req, res, next) => {
  const { body: movie } = req;

  try {
    await moviesBL.create(movie);
    res.redirect("/movies?status=added");
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});

module.exports = router;
