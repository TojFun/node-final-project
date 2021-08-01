const express = require("express");
const router = express.Router();

const membersBL = require("../services/members");

router.use((req, res, next) => {
  if (!req.session.user.permissions.includes("Create Subscriptions"))
    return res.redirect("/?status=no-permission");

  next();
});

// GET the "add member" page:
router.get("/", async (req, res, next) => {
  const { error } = req.query;

  res.render("member", {
    title: "Add Member",
    name: req.session.user.firstName,
    member: { _id: "add" },
    error,
  });
});

// POST new member to the server:
router.post("/", async (req, res, next) => {
  const { body: member } = req;

  try {
    await membersBL.create(member);

    res.redirect("/members?status=added");
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});

module.exports = router;
