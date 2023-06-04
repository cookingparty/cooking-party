import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import OnlineUsers from "./OnlineUsers";
import Friends from "./Friends";
import Chat from "./Chat";

const Recipes = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Recipes</h1>
      <div>
        Welcome {auth.username}!!
        <button onClick={() => dispatch(logout())}>Logout</button>
        {!!auth.id && <OnlineUsers />}
        {!!auth.id && <Friends />}
        {!!auth.id && <Chat />}
      </div>
    </div>
  );
};

export default Recipes;
