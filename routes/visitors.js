const router = require("express").Router();
let activity = require("../models/usersActivitySchema");

router.route("/").post((req, res) => {
  activity.create({
    visitors: 0,

    id: "visitorsKey",
    chrome: 0,

    other: 0,
    firefox: 0
  });
  res.json({ error: false, message: "added" });
});

module.exports = router;
