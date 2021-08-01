const express = require("express");
const subscriptions = require("../services/subscriptions");
const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    if (!req.session.user.permissions.includes("Update Subscriptions"))
      return res
        .status(401)
        .json({ ok: false, error: new Error("no permission") });

    await subscriptions.subscribe(req.params.id, req.body);

    res.status(201).json({ ok: true, error: null });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
});

// TODO: Fix this bug !!
module.exports = router;
