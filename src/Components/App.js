import React, { useEffect } from "react";
import Nav from "./Nav";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import Recipes from "./Recipes";
import Meals from "./Meals";
import Cocktails from "./Cocktails";

import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
  
    
        <div>
          <Nav />
          <Routes>

          {!!auth.id}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {!auth.id}
            <Route path="/" element={<Home />} />
          
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/cocktails" element={<Cocktails />} />
            <Route path="/logout" element={<Logout />} />

            </Routes>
          
        </div>
      
    </div>
  );
};

export default App;
