const express = require("express");
const app = express.Router();
const { Friendship } = require("../db");
const socketMap = require("../socketMap");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Friendship.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const friendship = await Friendship.create(req.body);

    if (socketMap[friendship.friendee_id]) {
      socketMap[friendship.friendee_id].socket.send(
        JSON.stringify({ type: "CREATE_FRIENDSHIP", friendship })
      );
    }
    res.status(201).send(friendship);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/:id", async (req, res, next) => {
  try {
    const friendship = await Friendship.findByPk(req.params.id);

    if (socketMap[friendship.friendee_id]) {
      socketMap[friendship.friendee_id].socket.send(
        JSON.stringify({ type: "DELETE_FRIENDSHIP", friendship: friendship.id })
      );
    }
    if (socketMap[friendship.friender_id]) {
      socketMap[friendship.friender_id].socket.send(
        JSON.stringify({ type: "DELETE_FRIENDSHIP", friendship: friendship.id })
      );
    }

    await friendship.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.put("/:id", async (req, res, next) => {
  try {
    const friendship = await Friendship.findByPk(req.params.id);
    res.send(await friendship.update(req.body));

    if (socketMap[friendship.friendee_id]) {
      socketMap[friendship.friendee_id].socket.send(
        JSON.stringify({ type: "UPDATE_FRIENDSHIP", friendship })
      );
    }
    if (socketMap[friendship.friender_id]) {
      socketMap[friendship.friender_id].socket.send(
        JSON.stringify({ type: "UPDATE_FRIENDSHIP", friendship })
      );
    }
  } catch (ex) {
    next(ex);
  }
});
