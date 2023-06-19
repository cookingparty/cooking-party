import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "./RecipeCard";
import Box from "@mui/material/Box";

const MySavedRecipes = () => {
  const { auth, favorites, recipes } = useSelector((state) => state);
  const dispatch = useDispatch();

  if (!favorites) {
    return null;
  }

  if (!recipes) {
    return null;
  }

  const savedRecipes = favorites
    .filter((favorite) => {
      return favorite.userId === auth.id;
    })
    .map((favorite) => {
      if (favorite.id) {
        return recipes.find((recipe) => {
          if (recipe.id) {
            return recipe.id === favorite.recipe_id;
          }
        });
      }
    });

  const carouselWidth = "85%";
  const carouselBackground = "#d7dbd8";

  return (
    <div style={{ margin: "50px", textAlign: "center" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom={2}
      >
        <Box
          sx={{
            backgroundColor: carouselBackground,
            margin: "60px",
            marginBottom: "80px",
            padding: "10px",
            height: "auto",
            width: carouselWidth,
          }}
        >
          <h1>My Saved Recipes</h1>
          <div className="recipe-grid">
            {savedRecipes.map((recipe) => {
              return (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  subheader={recipe.sourceName}
                  image={recipe.imageURL}
                  description={recipe.description ? recipe.description : ""}
                  readyInMinutes={recipe.readyInMinutes}
                  serves={recipe.servings}
                  avatar={"F"}
                  avatarColor={"red"}
                />
              );
            })}
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default MySavedRecipes;
