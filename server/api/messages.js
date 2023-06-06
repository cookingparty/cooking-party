const express = require("express");
const app = express.Router();
const { Message } = require("../db");
const { isLoggedIn } = require("./middleware.js");

module.exports = app;

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.messagesForUser());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.sendMessage(req.body));
  } catch (ex) {
    next(ex);
  }
});
