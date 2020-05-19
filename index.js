const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user");
const Admin = require("./models/admin");
const Voter = require("./models/voter");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 4000;
const db_link = process.env.MONGODB_URI || "mongodb://mongo:27017/voting";

// Establishing MongoDB connection
mongoose
  .connect(db_link, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// A Admin get route
app.get("/create_admin", (req, res) => {
  const user = new User({
    nameFirst: "Jon",
    nameLast: "Doe",
    password: "abcd@1234",
    emailAddress: "jon@doe.com",
  });
  user
    .save()
    .then((savedUser) => {
      new Admin({ user: savedUser })
        .save()
        .then((data) => {
          return res.json(savedUser.toJSON());
        })
        .catch((err) => {
          return res.json(err);
        });
    })
    .catch((err) => {
      return res.json(err);
    });
});

app.get("/create_voter", (req, res) => {
  const user = new User({
    nameFirst: "Jane",
    nameLast: "Doe",
    password: "abcd@1234",
    emailAddress: "jane1@doe.com",
  });
  user
    .save()
    .then((savedUser) => {
      new Voter({ user: savedUser })
        .save()
        .then((data) => {
          return res.json(savedUser.toJSON());
        })
        .catch((err) => {
          return res.json(err);
        });
    })
    .catch((err) => {
      return res.json(err);
    });
});

// Running the server
app.listen(port, () =>
  console.log(`App running successfully on port number ${port}...`)
);
