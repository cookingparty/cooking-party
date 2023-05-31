import axios from "axios";

const friends = (state = [], action) => {
  if (action.type === "SET_FRIENDS") {
    return action.friends;
  }
  return state;
};

export const fetchFriends = () => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem("token");
    if (getState().auth.id) {
      const response = await axios.get("/api/friends", {
        headers: {
          authorization: token,
        },
      });

      dispatch({
        type: "SET_FRIENDS",
        friends: [...response.data.friender, ...response.data.friendee],
      });
    }
  };
};

export const addFriend = (id) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem("token");
    if (getState().auth.id) {
      const response = await axios.post(
        "/api/friends/",
        { id },
        {
          headers: {
            authorization: token,
          },
        }
      );

      dispatch({
        type: "SET_FRIENDS",
        friends: [...response.data.friender, ...response.data.friendee],
      });
    }
  };
};

export const updateFriend = (updated) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem("token");
    if (getState().auth.id) {
      const response = await axios.put("/api/friends", updated, {
        headers: {
          authorization: token,
        },
      });
      dispatch({
        type: "SET_FRIENDS",
        friends: [...response.data.friender, ...response.data.friendee],
      });
    }
  };
};

export const unfriend = (id) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem("token");
    if (getState().auth.id) {
      const response = await axios.delete(`/api/friends/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch({
        type: "SET_FRIENDS",
        friends: [...response.data.friender, ...response.data.friendee],
      });
    }
  };
};

export default friends;
