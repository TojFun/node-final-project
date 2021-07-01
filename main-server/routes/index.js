const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { name: req.session.user.firstName });
});

module.exports = router;
