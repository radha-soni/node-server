const router = require("express").Router();
let events = require("../models/registerUsersdata");
let activity = require("../models/usersActivitySchema");
const server = require("../server");

router.route("/").post((req, res) => {
  const email = req.body.email;
  const ip_address = req.body.ip_address;
  const location = req.body.location;
  const message = req.body.message;
  const platform = req.body.platform;
  const loggedIn = req.body.loggedIn;

  events.findOneAndUpdate(
    { email },
    {
      $push: {
        loggedInTime: new Date(),
        ip_address: ip_address,
        location: location,
        message: message,
        platform: platform
      },

      $inc: {
        pageViewCount: 1
      },
      loggedIn: loggedIn
    },

    function(doc, err) {
      if (doc) {
        console.log("stats added");
      }

      events.countDocuments({ loggedIn: true }, function(err, docs) {
        server.io.emit("active user update", docs);
      });
    }
  );

  res.json({
    error: false,
    message: "loggedInTime"
  });
});

module.exports = router;
