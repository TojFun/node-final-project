const router = require("express").Router();

const { subscriptions } = require("../models/mongoSetup");

const setupDBRoute = require("../services/setupDBRoute");

router.get("/", async (req, res) => {
  try {
    const data = await subscriptions.get({});

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

setupDBRoute(router, subscriptions);

module.exports = router;
