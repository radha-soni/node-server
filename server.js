const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
let events = require("./models/registerUsersdata");

require("dotenv").config();

const app = express();
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

app.use("/loginEvent", loginEvent);
app.use("/addUsers", registerUsersdata);
app.use("/logout", logoutUpdate);
app.use("/loginFailed", loginFailed);
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

app.listen(port, () => {
  console.log("Server is running : " + port);
});
