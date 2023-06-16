import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Ingredient = ({ trigger }) => {
  const dispatch = useDispatch();

  const [ingredient, setIngredient] = useState({
    name: "",
    amount: 0,
    measurementUnit: "",
  });

  const onChange = (ev) => {
    setIngredient({
      ...ingredient,
      [ev.target.name]: ev.target.value || ev.target.checked,
    });
  };

  const create = async (ev) => {
    ev.preventDefault();
    if (trigger) {
      await dispatch(createIngredient(ingredient));
    }
    trigger = false;
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "space-around" }} >
      <TextField
        fullWidth
        label="amount"
        value={ingredient.amount}
        name="amount"
        onChange={onChange}
      />{" "}
      <TextField
        fullWidth
        label="name"
        value={ingredient.name}
        name="name"
        onChange={onChange}
      />
      <TextField
        fullWidth
        label="measurement unit"
        value={ingredient.measurementUnit}
        name="measurement unit"
        onChange={onChange}
      />
    </div>
  );
};

export default Ingredient;
