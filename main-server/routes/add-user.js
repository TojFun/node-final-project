const express = require("express");
const router = express.Router();

const usersBL = require("../services/users");
const permissionsBL = require("../services/permissions");

router.use((req, res, next) => {
  if (req.session.user.role !== "admin") return res.redirect("/");
  next();
});

// GET the "add user" page:
router.get("/", async (req, res, next) => {
  const { error } = req.query;
  const permissions = await permissionsBL.get({ permissions: [] });

  res.render("user", {
    title: "Add User",
    name: req.session.user.firstName,
    user: { id: "add" },
    permissions,
    error,
  });
});

// POST new user to the server:
router.post("/", async (req, res, next) => {
  const { body: user } = req;

  try {
    const { status } = await usersBL.create(user);

    res.redirect(`/users?status=${status}`);
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});

module.exports = router;
