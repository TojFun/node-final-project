const router = require("express").Router();
const { subscriptions } = require("../models/mongoDB");

router.get("/", async (req, res) => {
  try {
    const data = await subscriptions.get();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await subscriptions.get(id);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const status = await subscriptions.post(req.body);

    return res.status(201).json(status);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const status = await subscriptions.put(id, req.body);

    res.status(200).json(status);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const status = await subscriptions.delete(id);

    res.status(200).json(status);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
