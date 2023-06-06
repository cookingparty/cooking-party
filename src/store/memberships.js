import axios from "axios";

const memberships = (state = [], action) => {
  if (action.type === "SET_MEMBERSHIPS") {
    return action.memberships;
  }
  if (action.type === "ADD_MEMBERSHIP") {
    return [...state, action.membership];
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

export default memberships;
