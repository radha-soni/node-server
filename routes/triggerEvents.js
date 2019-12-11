const router = require("express").Router();
let events = require("../models/registerUsersdata");

router.route("/").post((req, res) => {
  const email = req.body.email;
  const ip_address = req.body.ip_address;
  const location = req.body.location;

  events.findOneAndUpdate(
    { email },
    { loggedInTime: new Date(), ip_address: ip_address, location: location },
    function(doc, err) {
      if (err) {
        console.log("error");
      } else {
        console.log("stats added");
      }
    }
  );
  res.json({ error: false, message: "loggedIn", ip_address: ip_address });
});

module.exports = router;
