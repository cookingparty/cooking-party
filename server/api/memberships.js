const express = require("express");
const app = express.Router();
const { Membership } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Membership.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(201).send(membership);
  } catch (ex) {
    next(ex);
  }
});

//couldn't test
app.delete("/:id", async (req, res, next) => {
  try {
    const membership = await Membership.findByPk(req.params.id);
    await membership.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.put("/:id", async (req, res, next) => {
  try {
    const membership = await Membership.findByPk(req.params.id);
    res.send(await membership.update(req.body));
  } catch (ex) {
    next(ex);
  }
});
