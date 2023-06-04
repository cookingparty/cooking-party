import axios from "axios";

const friendships = (state = [], action) => {
  if (action.type === "SET_FRIENDSHIPS") {
    return action.friendships;
  }
  if (action.type === "CREATE_FRIENDSHIP") {
    return [...state, action.friendship];
  }
  if (action.type === "UPDATE_FRIENDSHIP") {
    return state.map((f) => {
      if (f.id === action.friendship.id) {
        return action.friendship;
      }
      return f;
    });
  }
  if (action.type === "DELETE_FRIENDSHIP") {
    return state.filter((f) => f.id !== action.friendship);
  }
  return state;
};

export const fetchFriendships = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/friendships", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_FRIENDSHIPS", friendships: response.data });
  };
};

export const createFriendship = (friendship) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/friendships", friendship, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "CREATE_FRIENDSHIP", friendship: response.data });
  };
};

export const updateFriendship = (updated, id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(`/api/friendships/${id}`, updated, {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: "UPDATE_FRIENDSHIP",
      friendship: response.data,
    });
  };
};

export const deleteFriendship = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.delete(`/api/friendships/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: "DELETE_FRIENDSHIP",
      friendship: id,
    });
  };
};

export default friendships;
