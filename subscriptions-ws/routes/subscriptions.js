const router = require("express").Router();

const { subscriptions } = require("../models/mongoSetup");

const setupDBRoute = require("../services/setupDBRoute");

setupDBRoute(router, subscriptions);

module.exports = router;
