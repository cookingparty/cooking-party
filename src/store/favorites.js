import axios from "axios";

const favorites = (state = [], action) => {
  if (action.type === "SET_FAVORITES") {
    return action.favorites;
  }
  if (action.type === "ADD_FAVORITE") {
    return [...state, action.favorites];
  }
  if (action.type === "UPDATE_FAVORITE") {
    return state.map((f) => {
      if (f.id === action.favorite.id) {
        return action.favorite;
      }
      return f;
    });
  }
  if (action.type === "DELETE_FAVORITE") {
    return state.filter((f) => f.id !== action.favorite);
  }
  return state;
};

export const fetchFavorites = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/favorites", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_FAVORITES", favorites: response.data });
  };
};

export const createFavorite = (favorite) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/favorites", favorite, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "ADD_FAVORITE", favorite: response.data });
  };
};

export const updateFavorite = (updated, id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(`/api/favorites/${id}`, updated, {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: "UPDATE_FAVORITE",
      favorite: response.data,
    });
  };
};

export const deleteFavorite = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.delete(`/api/favorites/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: "DELETE_FAVORITE",
      favorite: id,
    });
  };
};

export default favorites;
