import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createFavoriteRecipePage,
  fetchIngredients,
  fetchInstructions,
  fetchComments,
  createComment,
} from "../store";
import * as DOMPurify from "dompurify";
import { Button, CardActions, IconButton, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const RecipePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { recipes, ingredients, instructions, auth, favorites, comments } =
    useSelector((state) => state);
  const recipe = recipes.find((r) => r.id === id);

  useEffect(() => {
    dispatch(fetchIngredients(id));
    dispatch(fetchInstructions(id));
    dispatch(fetchComments());
  }, []);

  const isFavorited = (recipeId) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) {
      const seededFromSpoonRecipe = recipes.find(
        (recipe) => recipe.spoonacular_id === recipeId
      );
      if (!seededFromSpoonRecipe) {
        return false;
      }
      if (
        !!favorites.find(
          (favorite) =>
            favorite.recipe_id === seededFromSpoonRecipe.id &&
            favorite.userId === auth.id
        )
      ) {
        return true;
      }
      return false;
    } else {
      if (!!favorites.find((favorite) => favorite.recipe_id === recipeId)) {
        return true;
      }
      return false;
    }
  };

  const favorite = (id) => {
    dispatch(createFavoriteRecipePage({ recipe_id: id, userId: auth.id }));
  };

  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");

  const addComment = () => {
    dispatch(
      createComment({ subject, rating, body, userId: auth.id, recipeId: id })
    );
    setSubject("");
    setRating(5);
    setBody("");
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
        {!isFavorited(recipe.id) && (
          <IconButton
            aria-label="add to favorites"
            onClick={() => favorite(id)}
          >
            <FavoriteIcon />
          </IconButton>
        )}
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
              <li
                dangerouslySetInnerHTML={{ __html: cleanInstruction }}
                key={instruction.id}
              />
            );
          })}
      </ol>
      <hr />
      <h3>
        Comments ({comments.filter((comment) => comment.recipeId === id).length}
        )
      </h3>
      <form>
        <TextField
          label="subject"
          value={subject}
          name="subject"
          onChange={(ev) => setSubject(ev.target.value)}
        />
        <TextField
          type="number"
          label="rating 1-5"
          value={rating}
          name="rating"
          onChange={(ev) => setRating(ev.target.value)}
        />
        <TextField
          label="body"
          value={body}
          name="body"
          onChange={(ev) => setBody(ev.target.value)}
        />
        <Button onClick={addComment}>Add Comment</Button>
      </form>
      <ul className="commentList">
        {comments
          .filter((comment) => comment.recipeId === id)
          .map((comment) => {
            return (
              <li className="comment" key={comment.id}>
                {comment.subject} - rating: {comment.rating}
                <hr />
                {comment.body}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default RecipePage;
