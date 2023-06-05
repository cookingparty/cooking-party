import React, { useEffect, useRef } from "react";
import Nav from "./Nav";
import FooterNav from "./FooterNav";
import Home from "./Home";
import Login from "./LoginRegister";
import Logout from "./Logout";
import Recipes from "./Recipes";
import Meals from "./Meals";
import Cocktails from "./Cocktails";

import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchOnlineUsers, fetchFriends } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import UpdateUser from "./UpdateUser";
import Profile from "./Profile";

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
      <div>
        {/* {!!auth.id && <Dashboard className="dashboard" />} */}

        <Nav />
        <Routes>
          {!!auth.id}
          <Route path="/home" element={<Home />} />
          <Route path="/shop/search/:filterString" element={<Recipes />} />
          <Route path="/update" element={<UpdateUser />} />
          <Route path="/users/:authId" element={<Profile />} />
          <Route path="/:account" element={<Login />} />

          {!auth.id}
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/cocktails" element={<Cocktails />} />

          <Route path="/logout" element={<Logout />} />
          <Route path="/shop/search/:filterString" element={<Recipes />} />
        </Routes>
      </div>
      <FooterNav />
    </div>
  );
};

export default App;
