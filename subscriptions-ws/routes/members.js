const router = require("express").Router();
const { members } = require("../models/mongoSetup");
const { getAll, create } = require("../services/members");

router.get("/", async (req, res) => {
  try {
    const data = await getAll();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await members.get({ _id: id });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const status = await create(req.body);

    return res.status(201).json(status);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const status = await members.put(id, () => req.body);

    res.status(200).json(status);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const status = await members.delete(id);

    res.status(200).json(status);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
