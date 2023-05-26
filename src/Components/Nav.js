import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/meals">Meals</Link>
      <Link to="/cocktails">Cocktails</Link>
    </nav>
  );
};

export default Nav;
