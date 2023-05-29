import axios from "axios";

const friends = (state = [], action) => {
  if (action.type === "SET_FRIENDS") {
    return action.friends;
  }
  if (action.type === "ADD_FRIEND") {
    return [...state, action.friend];
  }
  return state;
};

export const fetchFriends = () => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem("token");
    if (getState().auth.id) {
      const response = await axios.get("/api/users/friends", {
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

export const updateFriend = (updated) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem("token");
    if (getState().auth.id) {
      const response = await axios.put("/api/users/friends", updated, {
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

export const removeFriend = (id) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem("token");
    if (getState().auth.id) {
      const response = await axios.delete(`/api/users/friends/${id}`, {
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
    const authId = getState().auth.id;
    if (authId) {
      const response = await axios.post(
        "/api/friendships",
        { friender_id: authId, friendee_id: id },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({
        type: "ADD_FRIEND",
        friend: response.data,
      });
    }
  };
};

export default friends;
