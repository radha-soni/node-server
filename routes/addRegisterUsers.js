const router = require("express").Router();
let events = require("../models/registerUsersdata");

router.route("/").post((req, res) => {
  const email = req.body.email;

  events
    .find()
    .then(resp => {
      let newUser;

      if (email) {
        newUser = new events({
          email,
          loggedInTime: "N/A",
          loggedOutTime: "N/A",
          message: "",
          pageViewCount: 0
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
