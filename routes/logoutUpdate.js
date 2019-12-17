const router = require("express").Router();
let events = require("../models/registerUsersdata");

router.route("/").post((req, res) => {
  const email = req.body.email;

  events.findOneAndUpdate(
    { email },
    { $push: { loggedOutTime: new Date() } },
    function(doc, err) {
      if (doc) {
        console.log("stats added");
      }
    }
  );
  res.json({ error: false, message: "loggedOut" });
});

module.exports = router;
