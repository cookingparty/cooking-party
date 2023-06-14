import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchIngredients } from "../store";

const RecipePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { recipes, ingredients } = useSelector((state) => state);
  const recipe = recipes.find((r) => r.id === id);

  console.log("recipe", recipe);

  useEffect(() => {
    dispatch(fetchIngredients(id));
  }, []);

  if (!recipe) {
    return null;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>**** 4.6 (15) | 117 REVIEWS | 11 PHOTOS | +favorite</p>
      <p>{recipe.description || "This recipe has no description so far."}</p>
      <p>Recipe by *USER23* | Updated June 8, 2023</p>
      <img src={recipe.image} alt="Recipe Image" />
      <hr />
      <p>Info block/hero...Ready in?...Servings</p>
      <hr />
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient) => {
          return (
            <li key={ingredient.id}>
              {ingredient.amount} {ingredient.measurementUnit} {ingredient.name}
            </li>
          );
        })}
      </ul>
      <h3>Directions</h3>
      <ol>
        <li>Map Directions</li>
      </ol>
      <hr />
      <h3>Reviews (117)</h3>
      <p>Review Form w/rating</p>
      <p>Review 1</p>
    </div>
  );
};

export default RecipePage;
