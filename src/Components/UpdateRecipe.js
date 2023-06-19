import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchIngredients, fetchInstructions, updateRecipe } from "../store";

const UpdateRecipe = () => {
  const { auth, groups, memberships, recipes, ingredients, instructions } =
    useSelector((state) => state);
  const { id } = useParams();
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    image: "",
    imageURL: "",
    isCocktail: false,
    userId: auth.id,
    groupId: "",
    id: id,
  });
  const [_ingredients, setIngredients] = useState([
    { name: "", amount: 0, measurementUnit: "" },
  ]);

  const [_instructions, setInstructions] = useState([
    {
      listOrder: "",
      specification: "",
    },
  ]);

  useEffect(() => {
    dispatch(fetchIngredients(id));
    dispatch(fetchInstructions(id));
  }, []);

  useEffect(() => {
    if (id) {
      const _recipe = recipes.find((recipe) => recipe.id === id);

      setRecipe({
        title: _recipe.title || "",
        description: _recipe.description || "",
        image: _recipe.image || "",
        imageURL:
          _recipe.imageURL ===
          "https://live.staticflickr.com/65535/52983207456_5c25daeb1e_d.jpg"
            ? ""
            : _recipe.imageURL,
        isCocktail: _recipe.isCocktail,
        userId: auth.id,
        groupId: _recipe.groupId || "",
        id: id,
      });

      setIngredients([...ingredients]);

      setInstructions([...instructions]);
    }
  }, [id, recipes, instructions, ingredients, auth.id]);

  const onChangeRecipe = (ev) => {
    setRecipe({
      ...recipe,
      [ev.target.name]: ev.target.value || ev.target.checked,
    });
  };
  const onChangeIngredients = (ev, idx) => {
    const { name, value } = ev.target;
    const copy = [..._ingredients];
    copy[idx] = {
      ...copy[idx],
      [name]: value,
    };
    setIngredients(copy);
  };

  const onChangeInstructions = (ev, idx) => {
    const { name, value } = ev.target;

    const copy = [..._instructions];
    copy[idx] = {
      ...copy[idx],
      [name]: value,
    };
    setInstructions(copy);
  };

  const addIngredient = () => {
    console.log("_ingredients", _ingredients);
    setIngredients([
      ..._ingredients,
      { name: "", amount: 0, measurementUnit: "" },
    ]);
  };

  const addInstruction = () => {
    setInstructions([..._instructions, { listOrder: 1, specification: "" }]);
  };

  const edit = async (ev) => {
    ev.preventDefault();
    const updatedRecipe = await dispatch(
      updateRecipe({ recipe, _ingredients, _instructions })
    );
    navigate(`/recipes/${id}`);
  };

  const myMemberships = memberships.filter(
    (membership) => membership.member_id === auth.id
  );
  const myGroupIds = myMemberships.map((membership) => membership.groupId);
  const myGroups = groups.filter((group) => myGroupIds.includes(group.id));

  return (
    <div
      style={{
        width: "80%",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Update Recipe</h2>
      <form onSubmit={edit}>
        <TextField
          label="title"
          value={recipe.title}
          name="title"
          onChange={onChangeRecipe}
        />
        <TextField
          multiline
          label="description"
          value={recipe.description}
          name="description"
          onChange={onChangeRecipe}
        />
        <h4>Ingredients</h4>
        {_ingredients.map((ingredient, idx) => {
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
        {_instructions.map((instruction, idx) => {
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
        <Button type="submit">update</Button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
