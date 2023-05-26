const express = require("express");
const app = express.Router();
const { Comment } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Comment.findAll());
  } catch (ex) {
    next(ex);
  }
});

//couldn't test
app.post("/", async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).send(comment);
  } catch (ex) {
    next(ex);
  }
});

//couldn't test
app.delete("/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    await comment.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

//couldn't test
app.put("/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    res.send(await comment.update(req.body));
  } catch (ex) {
    next(ex);
  }
});
