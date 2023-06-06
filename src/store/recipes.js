import axios from "axios";

const recipes = (state = [], action) => {
  if (action.type === "CREATE_RECIPE") {
    state = [...state, action.recipes];
  }
  return state;
};

export const createRecipe = (recipe) => {
  return async (dispatch) => {
    const response = await axios.post("/api/recipes", recipe);
    dispatch({ type: "CREATE_RECIPE", recipe: response.data });
  };
};

export default recipes;
