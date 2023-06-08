const express = require("express");
const app = express();
const path = require("path");
const socketMap = require("./socketMap");
const jwt = require("jsonwebtoken");
app.engine("html", require("ejs").renderFile);
app.use(express.json({ limit: "50mb" }));

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "../static/index.html"), {
    client_id: process.env.client_id,
    facebook_client_id: process.env.facebook_client_id,
    facebook_redirect_uri: process.env.facebook_redirect_uri,
  });
});

app.use("/api/auth", require("./api/auth"));
app.use("/api/recipes", require("./api/recipes"));
app.use("/api/memberships", require("./api/memberships"));
app.use("/api/groups", require("./api/groups"));
app.use("/api/friendships", require("./api/friendships"));
app.use("/api/comments", require("./api/comments"));
app.use("/api/users", require("./api/users"));
app.use("/api/messages", require("./api/messages"));

app.get("/api/onlineUsers", (req, res, next) => {
  try {
    res.send(
      Object.values(socketMap).map((value) => {
        return {
          id: value.user.id,
          username: value.user.username,
          facebook_username: value.user.facebook_username,
        };
      })
    );
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
