const express = require("express");
const router = express.Router();

const usersBL = require("../services/users");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await usersBL.getAllUsers();
  console.log(users);
  res.render("users", { users });
});

module.exports = router;
