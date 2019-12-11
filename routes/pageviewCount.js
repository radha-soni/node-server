const router = require("express").Router();
let events = require("../models/registerUsersdata");
let count = 0;

router.route("/").post((req, res) => {
  console.log(count);
  count = count + 1;

  const email = req.body.email;
  const ip_address = req.body.ip_address;

  events.findOneAndUpdate(
    { email },
    {
      pageViewCount: count,
      ip_address: ip_address
    },
    function(doc, err) {
      if (err) {
        console.log("error");
      } else {
        console.log("stats added");
      }
    }
  );
  res.json({ error: false, message: "page viewed", ip_address: ip_address });
});

module.exports = router;
