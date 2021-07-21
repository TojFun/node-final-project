module.exports = (router, db) => {
  router.get("/", async (req, res) => {
    try {
      const data = await db.get({});

      res.status(200).json(data);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await db.get({ _id: id });

      res.status(200).json(data);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.post("/", async (req, res) => {
    try {
      const status = await db.post(req.body);

      return res.status(201).json(status);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const status = await db.put(id, () => req.body);

      res.status(200).json(status);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const status = await db.delete(id);

      res.status(200).json(status);
    } catch (error) {
      res.status(400).send(error);
    }
  });
};
