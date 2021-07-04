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

/* Add User: */

// GET the "add user" page:
router.get("/add", async (req, res, next) => {
  const { error } = req.query;
  const permissions = await usersBL.getPermissions({});

  res.render("user", {
    title: "Add User",
    name: req.session.user.firstName,
    user: { id: "add" },
    permissions,
    error,
  });
});

// POST new user to the server:
router.post("/add", async (req, res, next) => {
  const { body: user } = req;

  try {
    await usersBL.createUser(user);
    res.redirect("/users?status=added");
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});

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

  try {
    await usersBL.updateUser(id, user);
    res.redirect("/users?status=updated");
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});

// // DELETE a specific user:
// router.delete("/:username", async (req, res, next) => {
//   const deletingStatus = await usersManagement.delete(req.params.username);
//   res.json(deletingStatus.ok);
// });

module.exports = router;
