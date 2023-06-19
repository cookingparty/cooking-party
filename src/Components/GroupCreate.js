import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGroup, addMembership } from "../store";
import { Button, Checkbox, TextField } from "@mui/material";
import Box from "@mui/material/Box";

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

  const carouselWidth = "85%";
  const carouselBackground = "#d7dbd8";

  return (
    <div
      style={{
        margin: "50px",
        textAlign: "center",
        minHeight: "100vh",
        display: "grid",
        gridtemplaterows: "1fr auto",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom={2}
      >
        <Box
          sx={{
            backgroundColor: carouselBackground,
            margin: "15px",
            padding: "10px",
            height: "auto",
            width: carouselWidth,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Create A New Group</h1>
          <form
            onSubmit={create}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "100%", margin: "10px" }}
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Enter Name"
            />
            <TextField
              sx={{ width: "100%", margin: "10px" }}
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
            <Button type="submit" sx={{ width: "100%", margin: "10px" }}>
              Create Group
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default GroupCreate;
