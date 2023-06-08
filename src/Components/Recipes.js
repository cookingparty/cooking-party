import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import OnlineUsers from "./OnlineUsers";
import OnlineFriends from "./OnlineFriends";
import Friends from "./Friends";
import Chat from "./Chat";
import Instafeed from "instafeed.js";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { accessTokenIg } from '../../secrets';

const drawerWidth = "25%";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  instafeedContainer: {
    flexGrow: 1,
    padding: "20px",
  },

};

const Recipes = () => {
 

  useEffect(() => {
    const userFeed = new Instafeed({
      get: "user",
      resolution: "medium_resolution",
      limit: 6,
      accessToken: accessTokenIg,
      target: "instafeed-container",
    });
    userFeed.run();
  }, []);

  return (
    

      <div style={styles.instafeedContainer} id="instafeed-container"></div>
   
  );
};

export default Recipes;


