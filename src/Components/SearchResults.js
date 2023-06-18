import React from "react";
import RecipeCard from "./RecipeCard";

function SearchResult({ results }) {
  if (!results) {
    return null;
  }

  if (results.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <div className="recipe-grid">
      {results.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          subheader={recipe.sourceName}
          image={recipe.image}
          description={recipe.summary}
          readyInMinutes={recipe.readyInMinutes}
          serves={recipe.servings}
          avatar={"F"}
          avatarColor={"red"}
        />
      ))}
    </div>
  );
}

export default SearchResult;
