const router = require("express").Router();
const movies = require("../services/movies.js");

router.get("/", async (req, res) => {
  const data = await movies.get();
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await movies.get(id);
  res.json(data);
});

router.post("/", async (req, res) => {
  const status = await movies.post(req.body);

  return res.json(status);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const status = await movies.put(id, req.body);
  res.json(status);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const status = await movies.delete(id);
  res.json(status);
});

module.exports = router;
