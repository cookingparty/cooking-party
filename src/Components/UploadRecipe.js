import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../store/recipes";
import { Button, Checkbox, TextField } from "@mui/material";
import Ingredient from "./Ingredient";

const UploadRecipe = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    image: "",
    imageURL: "",
    isCocktail: false,
    userId: auth.id,
  });
  const [ingredients, setIngredients] = useState([
    { name: "", amount: 0, measurementUnit: "" },
  ]);

  const [instructions, setInstructions] = useState([
    {
      listOrder: "",
      specification: "",
    },
  ]);

  const onChangeRecipe = (ev) => {
    setRecipe({
      ...recipe,
      [ev.target.name]: ev.target.value || ev.target.checked,
    });
  };
  const onChangeIngredients = (ev, idx) => {
    const { name, value } = ev.target;
    const copy = [...ingredients];
    copy[idx] = {
      ...copy[idx],
      [name]: value,
    };
    setIngredients(copy);
  };

  const onChangeInstructions = (ev, idx) => {
    const { name, value } = ev.target;

    const copy = [...instructions];
    copy[idx] = {
      ...copy[idx],
      [name]: value,
    };
    setInstructions(copy);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", amount: 0, measurementUnit: "" },
    ]);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { listOrder: 1, specification: "" }]);
  };

  const create = async (ev) => {
    ev.preventDefault();
    const newRecipe = await dispatch(
      createRecipe({ recipe, ingredients, instructions })
    );
    navigate(`/recipes/${newRecipe.id}`);
  };

  return (
    <div>
      <h2>Upload Recipe</h2>
      <form onSubmit={create}>
        <TextField
          label="title"
          value={recipe.title}
          name="title"
          onChange={onChangeRecipe}
        />
        <TextField
          label="description"
          value={recipe.description}
          name="description"
          onChange={onChangeRecipe}
        />
        <h4>Ingredients</h4>
        {ingredients.map((ingredient, idx) => {
          return (
            <div
              style={{ display: "flex", justifyContent: "space-around" }}
              key={idx}
            >
              <TextField
                fullWidth
                label={`amount`}
                value={ingredient.amount}
                name="amount"
                onChange={(ev) => onChangeIngredients(ev, idx)}
              />
              <TextField
                fullWidth
                label={`name`}
                value={ingredient.name}
                name="name"
                onChange={(ev) => onChangeIngredients(ev, idx)}
              />
              <TextField
                fullWidth
                label={`measurement unit`}
                value={ingredient.measurementUnit}
                name="measurementUnit"
                onChange={(ev) => onChangeIngredients(ev, idx)}
              />
            </div>
          );
        })}
        <Button onClick={addIngredient} aria-haspopup="true">
          add more
        </Button>

        <h4>Instructions</h4>
        {instructions.map((instruction, idx) => {
          return (
            <div
              style={{ display: "flex", justifyContent: "space-around" }}
              key={idx}
            >
              <TextField
                fullWidth
                label="list order"
                value={(instruction.listOrder = idx + 1)}
                name="listOrder"
                onChange={(ev) => onChangeInstructions(ev, idx)}
              />
              <TextField
                fullWidth
                label="instruction"
                value={instruction.specification}
                name="specification"
                onChange={(ev) => onChangeInstructions(ev, idx)}
              />
            </div>
          );
        })}
        <Button onClick={addInstruction} aria-haspopup="true">
          add more
        </Button>

        <label>Image (PNG, JPEG, JPG only)</label>
        <input type="file" ref={ref} />
        <TextField
          label="image URL"
          value={recipe.imageURL}
          name="imageURL"
          onChange={onChangeRecipe}
        />
        <label htmlFor="cocktail">Cocktail?</label>
        <input type="checkbox" name="isCocktail" onChange={onChangeRecipe} />
        <Button type="submit">upload</Button>
      </form>
    </div>
  );
};

export default UploadRecipe;
