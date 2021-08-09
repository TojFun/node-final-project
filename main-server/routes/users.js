const express = require("express");
const router = express.Router();

const usersBL = require("../services/users");
const permissionsBL = require("../services/permissions");

router.use((req, res, next) =>
  req.session.user.role !== "admin"
    ? res.redirect("/status=no-permission")
    : next()
);

// GET users management page:
router.get("/", async function (req, res, next) {
  const { status } = req.query;

  const users = await usersBL.getAll();

  res.render("users", { users, status, name: req.session.user.firstName });
});

/* Update User */

// GET specific user's edit page:
router.get("/:id", async (req, res, next) => {
  const { error } = req.query;
  const { id } = req.params;

  const { user: currentUser } = req.session;

  const user =
    id === currentUser.id ? currentUser : await usersBL.get({ _id: id });

  if (user == null)
    return res.render("error", {
      message: `Couldn't find the user with the id of ${id}`,
      error: {},
    });

  const permissions = await permissionsBL.get(user);

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
    await usersBL.update(id, user);

    res.redirect("/users?status=updated");
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});

// DELETE a specific user:
router.delete("/:id", async (req, res, next) => {
  try {
    usersBL.delete(req.params.id);

    return res.status(200).json({ ok: true, error: null });
  } catch (error) {
    return res.status(400).json({ ok: false, error });
  }
});

module.exports = router;
