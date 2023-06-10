const express = require("express");
const app = express.Router();

const { User } = require("../db");
const { isLoggedIn } = require("./middleware");

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.getDay());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.addToDay(req.body));
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
