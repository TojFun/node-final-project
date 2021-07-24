const router = require("express").Router();
const { members } = require("../models/mongoSetup");
const { getAll } = require("../services/members");

const setupDBRoute = require("../services/setupDBRoute");

router.get("/", async (req, res) => {
  try {
    const data = await getAll();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

setupDBRoute(router, members);

module.exports = router;
