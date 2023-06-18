import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const MyRecipes = () => {
  const { auth, recipes } = useSelector((state) => state);

  const myRecipes = recipes.filter((recipe) => recipe.userId === auth.id);

  return (
    <div>
      <h1>My Recipes</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {myRecipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
                <CardMedia
                  component="img"
                  height="194"
                  src={recipe.image || recipe.imageURL}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <CardContent>
                    <Typography level="body3">
                      <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    </Typography>
                  </CardContent>
                  <Button>Edit</Button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyRecipes;
