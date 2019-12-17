const router = require("express").Router();
let events = require("../models/registerUsersdata");

router.route("/").post((req, res) => {
  const email = req.body.email;
  const platform = req.body.platform;

  events
    .find()
    .then(resp => {
      let newUser;

      if (email) {
        newUser = new events({
          email,
          loggedInTime: [],
          loggedOutTime: [],
          ip_address: [],
          location: [],
          message: [],
          pageViewCount: 0,
          platform: platform
        });
      }

      newUser
        .save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
