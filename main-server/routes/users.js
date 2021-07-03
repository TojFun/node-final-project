const express = require("express");
const router = express.Router();

const usersBL = require("../services/users");

router.use((req, res, next) => {
  if (req.session.user.role !== "admin") return res.redirect("/");
  next();
});

// GET users management page:
router.get("/", async function (req, res, next) {
  const { status } = req.query;

  const users = await usersBL.getAllUsers();

  res.render("users", { users, status, name: req.session.user.firstName });
});

// /* Create User: */

// // GET the create user page:
// router.get("/create", async (req, res, next) => {
//   const { error } = req.query;

//   const title = "Create User";
//   const user = { role: null, username: "", credits: "" };

//   res.render("user", { title, user, error });
// });

// // POST new user to the server:
// router.post("/create", async (req, res, next) => {
//   const { body: user } = req;

//   try {
//     await usersManagement.create(user);
//     res.redirect("/users?status=created");
//   } catch (err) {
//     res.redirect(`/users/create?error=${err.message}`);
//   }
// });

/* Update Users: */

// GET specific user's edit page:
router.get("/:id", async (req, res, next) => {
  const { error } = req.query;
  const { id } = req.params;

  const { user: currentUser } = req.session;

  const user = id === currentUser.id ? currentUser : await usersBL.getUser(id);

  if (user == null)
    return res.render("error", {
      message: `Couldn't find the user with the id of ${id}`,
      error: {},
    });

  const permissions = await usersBL.getPermissions(user);

  res.render("user", {
    title: `Update ${user.username}`,
    name: currentUser.firstName,
    user,
    permissions,
    error,
  });
});

// POST specific user's info to the server:
router.post("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body: user } = req;

  console.log(id, user);

  // try {
  //   await usersManagement.update(username, user);
  //   res.redirect("/users?status=updated");
  // } catch (err) {
  //   res.redirect(`/users/${username}?error=${err.message}`);
  // }
});

// // DELETE a specific user:
// router.delete("/:username", async (req, res, next) => {
//   const deletingStatus = await usersManagement.delete(req.params.username);
//   res.json(deletingStatus.ok);
// });

module.exports = router;
