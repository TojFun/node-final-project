const router = require("express").Router();
const { members } = require("../models/mongoSetup");

const setupDBRoute = require("../services/setupDBRoute");

setupDBRoute(router, members);

module.exports = router;
