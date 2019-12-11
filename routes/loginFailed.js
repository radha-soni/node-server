const router = require("express").Router();
let events = require("../models/registerUsersdata");

router.route("/").post((req, res) => {
  const email = req.body.email;
  const message = req.body.message;
  if (message === "Invalid password") {
    events.findOneAndUpdate(
      { email },
      { message: "Login failed :" + " " + message + " " + new Date() },
      function(doc, err) {
        if (err) {
          console.log("error");
        } else {
          console.log("stats added");
        }
      }
    );
    res.json({ error: true, message: message });
  } else if (message === "user does not exist") {
    events.findOneAndUpdate(
      { email },
      { message: "Login failed :" + " " + message + " " + new Date() },
      function(doc, err) {
        if (err) {
          throw err;
        }
      }
    );
    res.json({ error: true, message: message });
  } else {
    events.findOneAndUpdate(
      { email },
      { message: "Login successfull" },
      function(doc, err) {
        if (err) {
          console.log("error");
        } else {
          console.log("stats added");
        }
      }
    );
    res.json({ error: true, message: "Login successfull" });
  }
});

module.exports = router;
