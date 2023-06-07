import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createGroup, addMembership } from "../store";
import { Button, Checkbox, TextField } from "@mui/material";

const GroupCreate = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const create = async (ev) => {
    ev.preventDefault();
    const group = await dispatch(createGroup({ name, description, isPrivate }));
    dispatch(
      addMembership({
        groupId: group.id,
        member_id: auth.id,
        role: "Group Admin",
      })
    );
    navigate("/groups");
  };

  return (
    <div>
      <h1>Create A New Group</h1>
      <form onSubmit={create}>
        <TextField
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder="Enter Name"
        />
        <TextField
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          placeholder="Enter Description"
        />
        <label>
          Private group?
          <Checkbox
            type="checkbox"
            value={isPrivate}
            onClick={(ev) => setIsPrivate(!isPrivate)}
          />
        </label>
        <Button type="submit">Create Group</Button>
      </form>
    </div>
  );
};

export default GroupCreate;
