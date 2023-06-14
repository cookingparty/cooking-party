import axios from "axios";

const ingredients = (state = [], action) => {
  if (action.type === "SET_INGREDIENTS") {
    return action.ingredients;
  }
  return state;
};

export const fetchIngredients = (recipeId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/recipes/${recipeId}/ingredients`);
    dispatch({ type: "SET_INGREDIENTS", ingredients: response.data });
  };
};

export default ingredients;
