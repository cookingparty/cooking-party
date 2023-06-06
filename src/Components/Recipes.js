import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import OnlineUsers from "./OnlineUsers";
import Friends from "./Friends";
import Chat from "./Chat";
import Instafeed from 'instafeed.js';

const Recipes = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

 

  useEffect(() => {
    const userFeed = new Instafeed({
      get: 'user',
      resolution: 'medium_resolution',
      limit: 6,
      accessToken: 'IGQVJWOFR4VzVuSGtQZAjNQQUpCRU12dEp0anNHU1dFbTE3QkxVM0tzSS1fRGVSU0swZA1RJQWVQWmszYTZAibVEtdmdwNFJQRnQtTk50Q1VaQ0s4N19UaUs4ZATlGUDUzQmpJTnRrOGttMXRLOXNqdzg4bQZDZD',
      target: 'instafeed-container'
    });
    userFeed.run();
  }, [])

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

      <div id='instafeed-container'></div>
    </div>
  );
};

export default Recipes;
