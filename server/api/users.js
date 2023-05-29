const express = require("express");
const app = express.Router();
const { User } = require("../db");
const { isLoggedIn } = require("./middleware.js");

module.exports = app;

//get all users
app.get("/", async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get("/friends", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getFriends());
  } catch (ex) {
    next(ex);
  }
});

app.put("/friends", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.updateFriend(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/friends/:id", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.removeFriend(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

app.post("/friends", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.addFriend(req.body));
  } catch (ex) {
    next(ex);
  }
});
