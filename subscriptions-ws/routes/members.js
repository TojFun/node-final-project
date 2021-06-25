const router = require("express").Router();
const persons = require("../services/persons");

router.get("/", async (req, res) => {
  const data = await persons.get();
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await persons.get(id);
  res.json(data);
});

router.post("/", async (req, res) => {
  const status = await persons.post(req.body);

  return res.json(status);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const status = await persons.put(id, req.body);
  res.json(status);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const status = await persons.delete(id);
  res.json(status);
});

module.exports = router;
