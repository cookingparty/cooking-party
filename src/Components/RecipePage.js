import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createFavoriteRecipePage,
  fetchIngredients,
  fetchInstructions,
} from "../store";
import * as DOMPurify from "dompurify";
import { Button, CardActions, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const RecipePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { recipes, ingredients, instructions, auth } = useSelector(
    (state) => state
  );
  const recipe = recipes.find((r) => r.id === id);

  console.log("instructions", instructions);

  useEffect(() => {
    dispatch(fetchIngredients(id));
    dispatch(fetchInstructions(id));
  }, []);

  const favorite = (id) => {
    dispatch(createFavoriteRecipePage({ recipe_id: id, userId: auth.id }));
  };

  if (!recipe) {
    return null;
  }

  const cleanDescription = DOMPurify.sanitize(recipe.description);
  const cleanInstructions = DOMPurify.sanitize(instructions);

  return (
    <div>
      <h1>{recipe.title}</h1>
      <CardActions disableSpacing>
        {
          <IconButton
            aria-label="add to favorites"
            onClick={() => favorite(id)}
          >
            <FavoriteIcon />
          </IconButton>
        }
      </CardActions>
      {/* <p>**** 4.6 (15) | 117 REVIEWS | 11 PHOTOS | +favorite</p> */}
      <Button>Add to Meal Planner</Button>

      <span dangerouslySetInnerHTML={{ __html: cleanDescription }} />
      {/* <p>Recipe by *USER23* | Updated June 8, 2023</p> */}
      <img src={recipe.imageURL} alt="Recipe Image" />
      <hr />
      {/* <p>Info block/hero...Ready in?...Servings</p> */}
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
        {instructions
          .sort((a, b) => a.listOrder - b.listOrder)
          .map((instruction) => {
            const cleanInstruction = DOMPurify.sanitize(
              instruction.specification,
              { FORBID_TAGS: ["li"] }
            );
            return (
              <li dangerouslySetInnerHTML={{ __html: cleanInstruction }} />
            );
          })}
      </ol>
      <hr />
      <h3>Reviews (117)</h3>
      <p>Review Form w/rating</p>
      <p>Review 1</p>
    </div>
  );
};

export default RecipePage;
