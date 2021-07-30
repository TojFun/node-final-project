const router = require("express").Router();
const { movies } = require("../models/mongoSetup");

const { getAll } = require("../services/movies");

router.get("/", async (req, res) => {
  try {
    const data = await getAll();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = (await movies.get({ _id: id }))[0];

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const status = await movies.post(req.body);

    return res.status(201).json(status);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const status = await movies.put(id, () => req.body);

    res.status(200).json(status);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const status = await movies.delete(id);

    res.status(200).json(status);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
