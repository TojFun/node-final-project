const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const status =
    req.query.status != null ? titleCase(req.query.status) + "." : null;

  res.render("index", { user: req.session.user, status });
});

module.exports = router;
