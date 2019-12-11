const router = require("express").Router();
let events = require("../models/registerUsersdata");

router.route("/").post((req, res) => {
  const email = req.body.email;

  events.findOneAndUpdate({ email }, { loggedOutTime: new Date() }, function(
    doc,
    err
  ) {
    if (err) {
      console.log("error");
    } else {
      console.log("stats added");
    }
  });
  res.json({ error: false, message: "loggedOut" });
});

module.exports = router;
