import axios from "axios";

const memberships = (state = [], action) => {
  if (action.type === "SET_MEMBERSHIPS") {
    return action.memberships;
  }
  if (action.type === "ADD_MEMBERSHIP") {
    return [...state, action.membership];
  }
  if (action.type === "UPDATE_MEMBERSHIP") {
    return state.map((m) => {
      if (m.id === action.membership.id) {
        return action.membership;
      }
      return m;
    });
  }
  if (action.type === "DELETE_MEMBERSHIP") {
    return state.filter((m) => m.id !== action.membershipId);
  }
  return state;
};

export const fetchMemberships = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/memberships");
    dispatch({ type: "SET_MEMBERSHIPS", memberships: response.data });
  };
};

export const addMembership = (membership) => {
  return async (dispatch) => {
    const response = await axios.post("/api/memberships", membership);
    dispatch({ type: "ADD_MEMBERSHIP", membership: response.data });
  };
};

export const updateMembership = (updated, id) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/memberships/${id}`, updated);
    dispatch({
      type: "UPDATE_MEMBERSHIP",
      membership: response.data,
    });
  };
};

export const deleteMembership = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/memberships/${id}`);
    dispatch({
      type: "DELETE_MEMBERSHIP",
      membershipId: id,
    });
  };
};

export default memberships;
