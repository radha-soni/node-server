const router = require("express").Router();
let events = require("../models/registerUsersdata");
const server = require("../server");

router.route("/").post((req, res) => {
  const email = req.body.email;
  const loggedIn = req.body.loggedIn;

  events.findOneAndUpdate(
    { email },

    { $push: { loggedOutTime: new Date() }, loggedIn: loggedIn },

    function(doc, err) {
      if (doc) {
        console.log("stats added");
      }
      events.countDocuments({ loggedIn: true }, function(err, docs) {
        server.io.emit("active user update", docs);
      });
    }
  );
  res.json({ error: false, message: "loggedOut" });
});

module.exports = router;
