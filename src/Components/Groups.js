import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const Groups = () => {
  const { groups } = useSelector((state) => state);

  const carouselWidth = "85%";
  const carouselBackground = "#d7dbd8";

  return (
    <div style={{ margin: "50px", textAlign: "center" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom={2}
      >
        <img
          src="static/images/diningtable.jpg"
          alt="salmon photo"
          style={{
            top: 0,
            left: 0,
            width: carouselWidth,
            height: "auto",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            backgroundColor: carouselBackground,
            margin: "60px",
            marginBottom: "80px",
            padding: "10px",
            height: "auto",
            width: carouselWidth,
          }}
        >
          <h1>Groups</h1>
          <ul style={{ listStyle: "none", paddingLeft: "0" }}>
            {groups.map((group) => {
              return (
                <li key={group.id}>
                  <Link to={`/groups/${group.id}`}>{group.name}</Link>
                </li>
              );
            })}
          </ul>
          <Link to={"/groups/create"}>Create New Group</Link>
        </Box>
      </Box>
    </div>
  );
};

export default Groups;
