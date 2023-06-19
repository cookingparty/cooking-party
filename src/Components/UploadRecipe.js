import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../store/recipes";
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const UploadRecipe = () => {
  const { auth, groups, memberships } = useSelector((state) => state);
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
    groupId: "",
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

  useEffect(() => {
    ref.current.addEventListener("change", (ev) => {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => [
        setRecipe((currentVal) => ({
          ...currentVal,
          image: reader.result,
        })),
      ]);
    });
  }, [ref]);

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

  const myMemberships = memberships.filter(
    (membership) => membership.member_id === auth.id
  );
  const myGroupIds = myMemberships.map((membership) => membership.groupId);
  const myGroups = groups.filter((group) => myGroupIds.includes(group.id));

  return (
    <div style={{  textAlign: "center", 
    minHeight: "100vh",
      display: "grid",
      gridtemplaterows: "1fr auto",

  }}
    >,
    <div
      style={{
        
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        marginBottom:"120px",
      }}
    >
      <div
      style={{
        maxWidth: '700px'
      }}
      >
      <h2 style={{ textAlign: "center" }}>Upload Recipe</h2>
      <form onSubmit={create}>
        <TextField
          label="title"
          value={recipe.title}
          name="title"
          onChange={onChangeRecipe}
        />
        <TextField
          label="description"
          multiline
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

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label>Image (PNG, JPEG, JPG only)</label>
          <input type="file" ref={ref} />
        </div>

        <TextField
          label="image URL"
          value={recipe.imageURL}
          name="imageURL"
          onChange={onChangeRecipe}
        />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label htmlFor="cocktail">Cocktail?</label>
          <input type="checkbox" name="isCocktail" onChange={onChangeRecipe} />
        </div>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Group</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={recipe.groupId}
              label="groupId"
              name="groupId"
              onChange={onChangeRecipe}
            >
              {myGroups.map((group) => {
                return (
                  <MenuItem value={group.id} key={group.id}>
                    {group.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Button type="submit">upload</Button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default UploadRecipe;
