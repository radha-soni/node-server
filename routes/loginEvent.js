const router = require("express").Router();
let events = require("../models/registerUsersdata");

router.route("/").post((req, res) => {
  const email = req.body.email;
  const ip_address = req.body.ip_address;
  const location = req.body.location;
  const message = req.body.message;
  const platform = req.body.platform;

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
      }
    },

    function(doc, err) {
      if (doc) {
        console.log("stats added");
      }
    }
  );
  res.json({
    error: false,
    message: "loggedInTime"
  });
});

module.exports = router;
