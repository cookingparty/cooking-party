const express = require("express");
const app = express();
const path = require("path");
app.use(express.json({ limit: "50mb" }));

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

app.use("/api/auth", require("./api/auth"));
app.use("/api/recipes", require("./api/recipes"));
app.use("/api/memberships", require("./api/memberships"));
app.use("/api/groups", require("./api/groups"));
app.use("/api/friendships", require("./api/friendships"));
app.use("/api/comments", require("./api/comments"));
app.use("/api/users", require("./api/users"));

module.exports = app;
