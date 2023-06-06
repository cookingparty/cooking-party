import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createGroup, addMembership } from "../store";

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
        <input
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder="Enter Name"
        />
        <input
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          placeholder="Enter Description"
        />
        <label>
          Private group?
          <input
            type="checkbox"
            value={isPrivate}
            onClick={(ev) => setIsPrivate(!isPrivate)}
          />
        </label>
        <button>Create Group</button>
      </form>
    </div>
  );
};

export default GroupCreate;
