import axios from "axios";

const recipes = (state = [], action) => {
  if (action.type === "SET_RECIPES") {
    return action.recipes;
  }
  if (action.type === "CREATE_RECIPE") {
    state = [...state, action.recipe];
  }
  return state;
};

export const fetchRecipes = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/recipes");
    console.log("Fetched Recipes:", response.data);
    dispatch({ type: "SET_RECIPES", recipes: response.data });
  };
};

//create a new recipe from scratch
export const createRecipe = (recipe) => {
  return async (dispatch) => {
    const response = await axios.post("/api/recipes", recipe);
    dispatch({ type: "CREATE_RECIPE", recipe: response.data });
  };
};

//seed a recipe from the Spoonacular api
export const seedSpoonacularRecipe = (spoonacularId) => {
  return async (dispatch) => {
    const response = await axios.post("/api/recipes/spoonacular", {
      recipe_id: spoonacularId,
    });
    dispatch({ type: "CREATE_RECIPE", recipe: response.data });
    return response.data;
  };
};

export default recipes;
