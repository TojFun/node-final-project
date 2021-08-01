const express = require("express");
const router = express.Router();

const membersBL = require("../services/members.js");

// GET members management page:
router.get("/", async function (req, res, next) {
  if (!req.session.user.permissions.includes("View Subscriptions"))
    return res.redirect("/?status=no-permission");

  const { search } = req.query;

  try {
    const members = await membersBL.getAll(search);

    res.render("members", { members, name: req.session.user.firstName });
  } catch (error) {
    res.render("error", { message: "Couldn't connect to the REST API", error });
  }
});

/* Update Member */

// GET specific member's edit page:
router.get("/:id", async (req, res, next) => {
  if (!req.session.user.permissions.includes("View Subscriptions"))
    return res.redirect("/?status=no-permission");

  const { id } = req.params;

  try {
    const member = await membersBL.get(id);

    if (member == null) return res.redirect("/members?status=member-not-found");

    res.render("member", {
      title: `Update ${member.name}`,
      name: req.session.user.firstName,
      member,
    });
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});

// POST specific member's info to the server:
router.post("/:id", async (req, res, next) => {
  if (!req.session.user.permissions.includes("Update Subscriptions"))
    return res.redirect("/?status=no-permission");

  const { id } = req.params;
  const { body: member } = req;

  try {
    await membersBL.update(id, member);

    res.redirect("/members?status=updated");
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});

// DELETE a specific member:
router.delete("/:id", async (req, res, next) => {
  if (!req.session.user.permissions.includes("View Subscriptions"))
    return res.status(401).json({ ok: false, error: "no permission" });

  try {
    await membersBL.delete(req.params.id);

    return res.status(200).json({ ok: true, error: null });
  } catch (error) {
    return res.status(400).json({ ok: false, error });
  }
});

module.exports = router;
