const express = require("express");
const router = express.Router();

const usersBL = require("../services/users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login", {});
});

router.post("/", async (req, res, next) => {
  const user = await usersBL.getUser(req.body);

  if (user == null)
    return res.redirect("/login?status=wrong-username-or-password");

  req.session.user = user;

  res.redirect("/");
});

module.exports = router;
