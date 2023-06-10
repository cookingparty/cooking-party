import React from "react";
import { useSelector } from "react-redux";
import RecipeCard from "./RecipeCard";

const MySavedRecipes = () => {
  const { auth, favorites, recipes } = useSelector((state) => state);

  const savedRecipes = favorites
    .filter((favorite) => favorite.userId === auth.id)
    .map((favorite) => {
      return recipes.find((recipe) => recipe.id === favorite.recipe_id);
    });

  return (
    <div>
      <h1>My Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              subheader={recipe.sourceName}
              image={recipe.image}
              description={recipe.description}
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
