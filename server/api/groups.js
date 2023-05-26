const express = require("express");
const app = express.Router();
const { Group } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Group.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).send(group);
  } catch (ex) {
    next(ex);
  }
});

//couldn't test
app.delete("/:id", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.id);
    await group.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

//couldn't test
app.put("/:id", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.id);
    res.send(await group.update(req.body));
  } catch (ex) {
    next(ex);
  }
});
