import React, { useEffect, useRef } from "react";
import Nav from "./Nav";
import FooterNav from "./FooterNav";
import Home from "./Home";
import Login from "./LoginRegister";
import Logout from "./Logout";
import Recipes from "./Recipes";
import Meals from "./Meals";
import Cocktails from "./Cocktails";
import Groups from "./Groups";
import Group from "./Group";
import GroupCreate from "./GroupCreate";

import Chatting from "./Chatting";

import MySavedRecipes from "./MySavedRecipes";
import Friends from "./Friends";
import About from "./About";
import TermsAndConditions from "./TermsAndConditions";
import FAQ from "./FAQ";
import ContactUs from "./ContactUs";
import RecipeSearchPage from "./RecipeSearchPage";

import { useSelector, useDispatch } from "react-redux";
import {
  loginWithToken,
  fetchOnlineUsers,
  fetchFriendships,
  fetchMessages,
  fetchUsers,
  fetchGroups,
  fetchMemberships,
  fetchRecipes,
  fetchFavorites,
} from "../store";
import { Link, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import UpdateUser from "./UpdateUser";
import Profile from "./Profile";
import UploadRecipe from "./UploadRecipe";
import MealPlanner from "./MealPlanner";

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
      dispatch(fetchUsers());
      dispatch(fetchOnlineUsers());
      dispatch(fetchFriendships());
      dispatch(fetchMessages());
      dispatch(fetchGroups());
      dispatch(fetchMemberships());
      dispatch(fetchRecipes());
      dispatch(fetchFavorites());
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
          <Route path="/auth/:account" element={<Login />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/create" element={<GroupCreate />} />
          <Route path="/groups/:id" element={<Group />} />
          <Route path="/my-saved-recipes" element={<MySavedRecipes />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/about" element={<About />} />
          <Route path="/planner" element={<MealPlanner />} />

          {!auth.id}
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/upload" element={<UploadRecipe />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/cocktails" element={<Cocktails />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/shop/search/:filterString" element={<Recipes />} />
          <Route path="/recipeSearch" element={<RecipeSearchPage />} />
          <Route path="/recipeSearch/:filter" element={<RecipeSearchPage />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
      <FooterNav />
    </div>
  );
};

export default App;
