const express = require("express");
const router = express.Router();

const moviesBL = require("../services/movies");

// GET movies management page:
router.get("/", async function (req, res, next) {
  const { search } = req.query;

  const movies = await moviesBL.getAllMovies(search);

  res.render("movies", { movies, name: req.session.user.firstName });
});

/* Update Movie */

// // GET specific movie's edit page:
// router.get("/:id", async (req, res, next) => {
//   const { error } = req.query;
//   const { id } = req.params;

//   const { user: currentMovie } = req.session;

//   const movie =
//     id === currentMovie.id ? currentMovie : await moviesBL.getMovie({ _id: id });

// fix this mess

//   if (movie == null)
//     return res.render("error", {
//       message: `Couldn't find the movie with the id of ${id}`,
//       error: {},
//     });

//   const permissions = await moviesBL.getPermissions(movie);

//   res.render("movie", {
//     title: `Update ${movie.name}`,
//     name: currentMovie.firstName,
//     movie,
//     permissions,
//     error,
//   });
// });

// // POST specific movie's info to the server:
// router.post("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const { body: movie } = req;

//   try {
//     await moviesBL.updateMovie(id, movie);

//     res.redirect("/movies?status=updated");
//   } catch (error) {
//     res.render("error", { message: error.message, error });
//   }
// });

// // DELETE a specific movie:
// router.delete("/:id", async (req, res, next) => {
//   try {
//     moviesBL.deleteMovie(req.params.id);

//     return res.status(200).json({ ok: true, error: null });
//   } catch (error) {
//     return res.status(400).json({ ok: false, error });
//   }
// });

module.exports = router;
