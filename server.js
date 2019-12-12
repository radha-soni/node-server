const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

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
const login = require("./routes/pageviewCount");
app.use("/loginEvent", loginEvent);
app.use("/addUsers", registerUsersdata);
app.use("/logout", logoutUpdate);
app.use("/loginFailed", loginFailed);
app.use("/login", login);

app.listen(port, () => {
  console.log("Server is running : " + port);
});
