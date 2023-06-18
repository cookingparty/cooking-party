import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addToMealPlanner,
  createFavoriteRecipePage,
  fetchIngredients,
  fetchInstructions,
  fetchComments,
  createComment,
} from "../store";
import * as DOMPurify from "dompurify";
import { Button, CardActions, IconButton, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const RecipePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { recipes, ingredients, instructions, auth, favorites, comments } =
    useSelector((state) => state);
  const recipe = recipes.find((r) => r.id === id);

  const types = ["snack", "breakfast", "lunch", "dinner"];
  const today = dayjs().format("YYYY-MM-DD");

  const [date, setDate] = useState(dayjs(today));
  const [type, setType] = useState("");

  useEffect(() => {
    dispatch(fetchIngredients(id));
    dispatch(fetchInstructions(id));
    dispatch(fetchComments());
  }, []);

  const isFavorited = (recipeId) => {
    if (!!favorites.find((favorite) => favorite.recipe_id === recipeId)) {
      return true;
    }
    return false;
  };

  const handleChange = (event) => {
    setType(event.target.value);
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

  const addToPlanner = ({ id, type, date }) => {
    const newDate = dayjs(date).format("YYYY-MM-DD");
    dispatch(addToMealPlanner({ id, type, date: newDate }));
  };

  if (!recipe) {
    return null;
  }

  const cleanDescription = DOMPurify.sanitize(recipe.description);
  const cleanInstructions = DOMPurify.sanitize(instructions);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1>{recipe.title}</h1>
        <CardActions disableSpacing>
          {!!auth.id && !isFavorited(id) && (
            <IconButton
              aria-label="add to favorites"
              onClick={() => favorite(id)}
            >
              <FavoriteIcon />
            </IconButton>
          )}
        </CardActions>
      </div>
      {/* <p>**** 4.6 (15) | 117 REVIEWS | 11 PHOTOS | +favorite</p> */}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker value={date} onChange={(newDate) => setDate(newDate)} />
          </DemoContainer>
        </LocalizationProvider>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type of Meal</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="type"
              onChange={handleChange}
            >
              {types.map((type) => {
                return (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Button onClick={() => addToPlanner({ date, id, type })}>
          Add to Meal Planner
        </Button>
      </div>

      <span dangerouslySetInnerHTML={{ __html: cleanDescription }} />
      {/* <p>Recipe by *USER23* | Updated June 8, 2023</p> */}
      <img
        src={recipe.imageURL || recipe.image}
        alt="Recipe Image"
        style={{
          margin: "50px",
          marginTop: "50px",
          padding: "30px",
          backgroundColor: "#d7dbd8",
          width: "75%",
          alignItems: "center",
        }}
      />
      <hr />
      {/* <p>Info block/hero...Ready in?...Servings</p> */}
      <hr />
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient) => {
          return (
            <li key={ingredient.id}>
              {ingredient.amount > 0 ? ingredient.amount : null}{" "}
              {ingredient.measurementUnit} {ingredient.name}
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
                key={instruction.id}
                dangerouslySetInnerHTML={{ __html: cleanInstruction }}
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
