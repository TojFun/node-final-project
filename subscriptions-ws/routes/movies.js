const router = require("express").Router();
const { movies } = require("../models/mongoSetup");

const setupDBRoute = require("../services/setupDBRoute");

setupDBRoute(router, movies);

module.exports = router;
