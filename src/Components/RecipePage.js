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
  fetchRecipes,
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
import Card from "@mui/material/Card";

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
    dispatch(fetchRecipes());
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
            margin: "15px",
            padding: "10px",
            height: "auto",
            width: carouselWidth,
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
        </Box>

        <Box
          sx={{
            backgroundColor: carouselBackground,
            margin: "15px",
            padding: "10px",
            height: "auto",
            width: carouselWidth,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Type of Meal
              </InputLabel>
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
        </Box>

        <Box
          sx={{
            backgroundColor: carouselBackground,
            margin: "15px",
            padding: "10px",
            height: "auto",
            width: carouselWidth,
          }}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: cleanDescription || "This recipe has no description yet.",
            }}
          />
        </Box>

        <img
          src={recipe.imageURL || recipe.image}
          alt="Recipe Image"
          style={{
            margin: "15px",
            padding: "30px",
            backgroundColor: "#d7dbd8",
            width: carouselWidth,
            alignItems: "center",
          }}
        />
        <Box
          sx={{
            backgroundColor: carouselBackground,
            margin: "15px",
            padding: "10px",
            height: "auto",
            width: carouselWidth,
          }}
        >
          <h3>Ingredients</h3>
          <ul style={{ listStyle: "none", paddingLeft: "0" }}>
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
          <ol style={{ listStyle: "none", paddingLeft: "0" }}>
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
        </Box>
        <Box
          sx={{
            backgroundColor: carouselBackground,
            margin: "15px",
            padding: "10px",
            height: "auto",
            width: carouselWidth,
          }}
        >
          <h3>
            Comments (
            {comments.filter((comment) => comment.recipeId === id).length})
          </h3>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "50%", margin: "10px" }}
              label="subject"
              value={subject}
              name="subject"
              onChange={(ev) => setSubject(ev.target.value)}
            />
            <TextField
              sx={{ width: "50%", margin: "10px" }}
              type="number"
              label="rating 1-5"
              value={rating}
              name="rating"
              onChange={(ev) => setRating(ev.target.value)}
            />
            <TextField
              sx={{ width: "50%", margin: "10px" }}
              label="body"
              value={body}
              name="body"
              onChange={(ev) => setBody(ev.target.value)}
            />
            <Button sx={{ width: "50%", margin: "10px" }} onClick={addComment}>
              Add Comment
            </Button>
          </form>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {comments
              .filter((comment) => comment.recipeId === id)
              .sort((a, b) => {
                if (a.createdAt < b.createdAt) {
                  return 1;
                }
                if (a.createdAt > b.createdAt) {
                  return -1;
                }
                return 0;
              })
              .map((comment) => {
                return (
                  <Card
                    key={comment.id}
                    sx={{
                      margin: "10px",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      {comment.subject}
                    </span>{" "}
                    - rating: {comment.rating}
                    <br />
                    {comment.body}
                  </Card>
                );
              })}
          </ul>
        </Box>
      </Box>
    </div>
  );
};

export default RecipePage;
