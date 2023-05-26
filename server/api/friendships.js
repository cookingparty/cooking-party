const express = require("express");
const app = express.Router();
const { Friendship } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Friendship.findAll());
  } catch (ex) {
    next(ex);
  }
});

//couldn't test
app.post("/", async (req, res, next) => {
  try {
    const friendship = await Friendship.create(req.body);
    res.status(201).send(friendship);
  } catch (ex) {
    next(ex);
  }
});

//couldn't test
app.delete("/:id", async (req, res, next) => {
  try {
    const friendship = await Friendship.findByPk(req.params.id);
    await friendship.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

//couldn't test
app.put("/:id", async (req, res, next) => {
  try {
    const friendship = await Friendship.findByPk(req.params.id);
    res.send(await friendship.update(req.body));
  } catch (ex) {
    next(ex);
  }
});
