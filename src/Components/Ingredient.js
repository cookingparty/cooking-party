import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createIngredient } from "../store";

const Ingredient = ({ trigger, setTrigger, recipeId }) => {
  const dispatch = useDispatch();

  console.log("trigger", trigger);

  const [ingredient, setIngredient] = useState({
    name: "",
    amount: 0,
    measurementUnit: "",
    recipeId: recipeId,
  });

  useEffect(() => {
    const create = async () => {
      await dispatch(createIngredient(ingredient));
    };

    if (trigger) {
      create();
    }
    setTrigger(false);
  }, [trigger]);

  const onChange = (ev) => {
    setIngredient({
      ...ingredient,
      [ev.target.name]: ev.target.value,
    });
  };

  //   const create = async (ev) => {
  //     ev.preventDefault();
  //     if (trigger) {
  //       await dispatch(createIngredient(ingredient));
  //     }
  //     trigger = false;
  //   };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
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
        name="measurementUnit"
        onChange={onChange}
      />
    </div>
  );
};

export default Ingredient;
