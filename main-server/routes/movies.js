const express = require("express");
const router = express.Router();

const moviesBL = require("../services/movies");

// GET movies management page:
router.get("/", async function (req, res, next) {
  if (!req.session.user.permissions.includes("View Movies"))
    return res.redirect("/?status=no-permission");

  const { search } = req.query;

  try {
    const movies = await moviesBL.getAll(search);

    res.render("movies", { movies, search, name: req.session.user.firstName });
  } catch (error) {
    res.render("error", { message: "Couldn't connect to ws", error });
  }
});

/* Update Movie */

// GET specific movie's edit page:
router.get("/:id", async (req, res, next) => {
  if (!req.session.user.permissions.includes("View Movies"))
    return res.redirect("/?status=no-permission");

  const { id } = req.params;

  try {
    const movie = await moviesBL.get(id);

    if (movie == null) return res.redirect("/movies?status=movie-not-found");

    res.render("movie", {
      title: `Update ${movie.name}`,
      name: req.session.user.firstName,
      movie,
    });
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});

// POST specific movie's info to the server:
router.post("/:id", async (req, res, next) => {
  if (!req.session.user.permissions.includes("Update Movies"))
    return res.redirect("/?status=no-permission");

  const { id } = req.params;
  const { body: movie } = req;

  try {
    await moviesBL.update(id, movie);

    res.redirect("/movies?status=updated");
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});

// DELETE a specific movie:
router.delete("/:id", async (req, res, next) => {
  if (!req.session.user.permissions.includes("View Movies"))
    return res.status(401).json({ ok: false, error: "no permission" });

  try {
    await moviesBL.delete(req.params.id);

    return res.status(200).json({ ok: true, error: null });
  } catch (error) {
    return res.status(400).json({ ok: false, error });
  }
});

module.exports = router;
