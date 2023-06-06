import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../store/recipes";
import { Button, Checkbox, TextField } from "@mui/material";

const UploadRecipe = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: "",
    imageURL: "",
    isCocktail: false,
    userId: auth.id,
  });

  const onChange = (ev) => {
    setRecipe({
      ...recipe,
      [ev.target.name]: ev.target.value || ev.target.checked,
    });
  };

  const create = async (ev) => {
    ev.preventDefault();
    console.log(recipe);
    await dispatch(createRecipe(recipe));
    navigate("/recipes");
  };

  return (
    <div>
      <h2>Upload Recipe</h2>
      <form onSubmit={create}>
        <TextField
          label="title"
          value={recipe.title}
          name="title"
          onChange={onChange}
        />
        <TextField
          label="ingredients"
          value={recipe.ingredients}
          name="ingredients"
          onChange={onChange}
        />{" "}
        <TextField
          label="instructions"
          value={recipe.instructions}
          name="instructions"
          onChange={onChange}
        />
        <label>Image (PNG, JPEG, JPG only)</label>
        <input type="file" ref={ref} />
        <TextField
          label="image URL"
          value={recipe.imageURL}
          name="imageURL"
          onChange={onChange}
        />
        <label htmlFor="cocktail">Cocktail?</label>
        <input type="checkbox" name="isCocktail" onChange={onChange} />
        <Button type="submit">upload</Button>
      </form>
    </div>
  );
};

export default UploadRecipe;