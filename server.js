const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

let events = require("./models/registerUsersdata");
let activity = require("./models/usersActivitySchema");

require("dotenv").config();

const app = express();
var http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB conn. success");
});
const loginEvent = require("./routes/loginEvent");
const registerUsersdata = require("./routes/addRegisterUsers");
const logoutUpdate = require("./routes/logoutUpdate");
const loginFailed = require("./routes/loginFailed");
const visitors = require("./routes/visitors");
const visitorUpdate = require("./routes/visitorUpdate");
const totalViews = require("./routes/totalPageViews");

app.use("/loginEvent", loginEvent);
app.use("/addUsers", registerUsersdata);
app.use("/logout", logoutUpdate);
app.use("/loginFailed", loginFailed);
app.use("/visitors", visitors);
app.use("/visitorUpdate", visitorUpdate);
app.use("/totalViews", totalViews);

app.get("/users", (req, res) => {
  events.find({}, function(err, docs) {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }

    res.send(docs);
  });
});
app.get("/getvisitors", (req, res) => {
  console.log("run");
  activity.find({}, function(err, docs) {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }

    res.send(docs);
  });
});
app.get("/totalViews", (req, res) => {
  activity.find({}, function(err, docs) {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }

    res.json(docs[0].totalViews);
  });
});

io.on("connection", function(socket) {
  events.countDocuments({ loggedIn: true }, function(err, docs) {
    io.emit("active user update", docs);
  });
  activity.find({}, function(err, docs) {
    io.emit("visitors update", docs[0].visitors);
  });
  activity.find({}, function(err, docs) {
    io.emit("pageView update", docs[0].totalViews);
  });
  activity.find({}, function(err, docs) {
    io.emit("other update", docs[0].other);
  });
  activity.find({}, function(err, docs) {
    io.emit("mozilla update", docs[0].firefox);
  });
  activity.find({}, function(err, docs) {
    io.emit("chrome update", docs[0].chrome);
  });
});

http.listen(port, function() {
  console.log("listening on *:4000");
});

module.exports.io = io;
