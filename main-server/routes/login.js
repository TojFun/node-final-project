const express = require("express");
const router = express.Router();

const usersBL = require("../services/users");

const { titleCase } = require("../../models/utils");

/* GET home page. */
router.get("/", function (req, res, next) {
  const status =
    req.query.status != null ? titleCase(req.query.status) + "." : null;

  res.render("login", { status });
});

router.post("/", async (req, res, next) => {
  const user = await usersBL.login(req.body);

  if (user == null)
    return res.redirect("/login?status=wrong-username-or-password");

  req.session.user = user;

  res.redirect("/");
});

module.exports = router;
