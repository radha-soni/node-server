const router = require("express").Router();
let activity = require("../models/usersActivitySchema");
const server = require("../server");

router.route("/").post((req, res) => {
  const id = req.body.id;
  const source = req.body.source;

  if (source === "firefox") {
    activity.findOneAndUpdate(
      { id },
      { $inc: { firefox: 1, visitors: 1 } },
      function(doc, err) {
        activity.find({}, function(err, docs) {
          server.io.emit("visitors update", docs[0].visitors);
          server.io.emit("firefox update", docs[0].firefox);
        });
      }
    );
  } else if (source === "chrome") {
    activity.findOneAndUpdate(
      { id },
      { $inc: { chrome: 1, visitors: 1 } },

      function(doc, err) {
        activity.find({}, function(err, docs) {
          server.io.emit("visitors update", docs[0].visitors);
          server.io.emit("chrome update", docs[0].chrome);
        });
      }
    );
  } else {
    console.log("other");
    activity.findOneAndUpdate(
      { id },
      { $inc: { other: 1, visitors: 1 } },

      function(doc, err) {
        activity.find({}, function(err, docs) {
          server.io.emit("visitors update", docs[0].visitors);
          server.io.emit("other update", docs[0].other);
        });
      }
    );
  }

  // res.json({
  //   error: false,
  //   message: "updated"
  // });
});

module.exports = router;
