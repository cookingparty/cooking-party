import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";

function TrendingCocktails() {
  const [trendingCocktails, setTrendingCocktails] = useState([]);

  useEffect(() => {
    getTrendingCocktails();
  }, []);

  const getTrendingCocktails = async () => {
    const apiKey = "9973533";
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v2/${apiKey}/popular.php`
      );

      const data = response.data;
      const cocktails = data.drinks.slice(0, 5);
      setTrendingCocktails(cocktails);
      console.log(cocktails);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="recipe-grid">
      {trendingCocktails.map((recipe) => (
        <RecipeCard
          key={recipe.idDrink}
          id={recipe.idDrink}
          title={recipe.strDrink}
          image={recipe.strDrinkThumb}
          description={recipe.strInstructions}
          avatar={"C"}
          avatarColor={"blue"}
          isCocktail={true}
        />
      ))}
    </div>
  );
}

export default TrendingCocktails;
