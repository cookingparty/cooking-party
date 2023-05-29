import React, { useEffect, useRef } from "react";
import Nav from "./Nav";
import Home from "./Home";
import Login from "./Login";
import Recipes from "./Recipes";
import Meals from "./Meals";
import Cocktails from "./Cocktails";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchOnlineUsers, fetchFriends } from "../store";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const { auth } = useSelector((state) => state);
  const prevAuth = useRef(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (!prevAuth.current.id && auth.id) {
      console.log("just logged in");
      window.socket = new WebSocket(
        window.location.origin.replace("http", "ws")
      );
      window.socket.addEventListener("open", () => {
        window.socket.send(
          JSON.stringify({ token: window.localStorage.getItem("token") })
        );
      });
      window.socket.addEventListener("message", (ev) => {
        const message = JSON.parse(ev.data);
        if (message.type) {
          dispatch(message);
        }
        console.log(message);
      });
      dispatch(fetchOnlineUsers());
      dispatch(fetchFriends());
    }
    if (prevAuth.current.id && !auth.id) {
      console.log("logged out");
      window.socket.close();
    }
  }, [auth]);

  useEffect(() => {
    prevAuth.current = auth;
  });

  return (
    <div>
      <h1>Cooking Party</h1>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/cocktails" element={<Cocktails />} />

          {!!auth.id}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      {/* )} */}
    </div>
  );
};

export default App;
