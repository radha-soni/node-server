const router = require("express").Router();
let events = require("../models/registerUsersdata");

router.route("/").post((req, res) => {
  const email = req.body.email;
  const message = req.body.message;

  if (message === "Invalid password") {
    events.findOneAndUpdate({ email }, { message: message }, function(
      doc,
      err
    ) {
      if (doc) {
        console.log("stats added");
      }
    });
    res.json({ error: true, message: message });
  } else {
    console.log("error");
  }
  // } else {
  //   events.findOneAndUpdate(
  //     { email },
  //     { message: "Login successfull" },
  //     function(doc, err) {
  //       if (err) {
  //         console.log("error");
  //       } else {
  //         console.log("stats added");
  //       }
  //     }
  //   );
  //   res.json({ error: true, message: "Login successfull" });
  // }
});

module.exports = router;
