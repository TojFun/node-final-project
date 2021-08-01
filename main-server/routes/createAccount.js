const express = require("express");
const { createPassword } = require("../services/users");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("createAccount", {});
});

router.post("/", async (req, res) => {
  const { status, ok } = await createPassword(req.body);

  res.redirect(`/${ok ? "login" : "create-account"}?status=${status}`);
});

module.exports = router;
