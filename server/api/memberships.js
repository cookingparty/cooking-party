const express = require("express");
const app = express.Router();
const { Membership, Group, User } = require("../db");
const socketMap = require("../socketMap");
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Membership.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const membership = await Membership.create(req.body);

    const group = await Group.findByPk(membership.groupId);

    const groupAdminMembership = await Membership.findOne({
      where: {
        groupId: group.id,
        role: "Group Admin",
      },
    });
    const groupAdminId = groupAdminMembership.member_id;

    if (groupAdminId !== req.user.id && socketMap[groupAdminId]) {
      socketMap[groupAdminId].socket.send(
        JSON.stringify({ type: "ADD_MEMBERSHIP", membership })
      );
    }

    res.status(201).send(membership);
  } catch (ex) {
    next(ex);
  }
});

//couldn't test
app.delete("/:id", async (req, res, next) => {
  try {
    const membership = await Membership.findByPk(req.params.id);

    if (socketMap[membership.member_id]) {
      socketMap[membership.member_id].socket.send(
        JSON.stringify({
          type: "DELETE_MEMBERSHIP",
          membershipId: membership.id,
        })
      );
    }

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

    if (socketMap[membership.member_id]) {
      socketMap[membership.member_id].socket.send(
        JSON.stringify({ type: "UPDATE_MEMBERSHIP", membership })
      );
    }
  } catch (ex) {
    next(ex);
  }
});
