const router = require("express").Router();
const { members } = require("../models/mongoSetup");

const setupDBRoute = require("../services/setupDBRoute");

router.get("/", async (req, res) => {
  try {
    const data = await members.get({});

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

setupDBRoute(router, members);

module.exports = router;
