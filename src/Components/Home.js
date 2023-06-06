import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TrendingMeals from "./TrendingMeals";
import TrendingCocktails from "./TrendingCocktails";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
      {auth.id ? (
        <p>Welcome {auth.username || auth.facebook_username}!</p>
      ) : (
        <Button
          component={Link}
          to="/auth/login"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: 3,
            color: "#333",
            backgroundColor: "#F9F6EE",
            "&:hover": {
              backgroundColor: "#F5F5F5",
              color: "#888",
            },
          }}
        >
          Login Here
        </Button>
      )}
      <div>
        <h2>Trending Meal Recipes</h2>
        <TrendingMeals />

        <h2>Trending Cocktail Recipes</h2>
        <TrendingCocktails />
      </div>
    </div>
  );
};

export default Home;
