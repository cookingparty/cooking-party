import React, { useEffect } from "react";
import Nav from "./Nav";
import Home from "./Home";
import Login from "./Login";
import Recipes from "./Recipes";
import Meals from "./Meals";
import Cocktails from "./Cocktails";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <h1>Cooking Party</h1>
      {auth.id ? <Recipes /> : null}
      {auth.id && (
        <div>
          <Dashboard className="dashboard" />

          <Nav />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/cocktails" element={<Cocktails />} />
      </Routes>
    </div>
  );
};

export default App;
