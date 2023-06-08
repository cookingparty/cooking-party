import axios from "axios";

const recipes = (state = [], action) => {
  if (action.type === "SET_RECIPES") {
    return action.recipes;
  }
  if (action.type === "CREATE_RECIPE") {
    state = [...state, action.recipes];
  }
  return state;
};

export const fetchRecipes = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/recipes");
    dispatch({ type: "SET_RECIPES", recipes: response.data });
  };
};

export const createRecipe = (recipe) => {
  return async (dispatch) => {
    const response = await axios.post("/api/recipes", recipe);
    dispatch({ type: "CREATE_RECIPE", recipe: response.data });
  };
};

export default recipes;
