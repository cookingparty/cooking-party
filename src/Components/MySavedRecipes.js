import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "./RecipeCard";
import { fetchFavorites } from "../store";

const MySavedRecipes = () => {
  const { auth, favorites, recipes } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log("favorites", favorites);
  console.log("recipes", recipes);
  console.log("auth", auth);

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

  console.log("savedRecipes", savedRecipes);

  return (
    <div>
      <h1>My Saved Recipes</h1>
      <ul>
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
      </ul>
    </div>
  );
};

export default MySavedRecipes;
