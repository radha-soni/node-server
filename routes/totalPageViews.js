const router = require("express").Router();
let activity = require("../models/usersActivitySchema");
let events = require("../models/registerUsersdata");
const server = require("../server");

router.route("/").post((req, res) => {
  const id = req.body.id;

  events.find({}, function(err, docs) {
    let totalViews = 0;
    docs.forEach(obj => {
      totalViews += obj.pageViewCount;
    });

    activity.findOneAndUpdate(
      { id },
      {
        totalViews
      },

      function(err, docs) {
        activity.find({}, function(err, docs) {
          server.io.emit("pageView update", docs[0].totalViews);
        });
      }
    );
  });

  res.json({
    error: false,
    message: "updated"
  });
});

module.exports = router;
