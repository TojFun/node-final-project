const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (!req.session.user) return res.status(500).send(null);

  req.session.destroy();

  res.redirect("/login");
});

module.exports = router;
