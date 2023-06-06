import axios from "axios";

const groups = (state = [], action) => {
  if (action.type === "SET_GROUPS") {
    return action.groups;
  }
  if (action.type === "ADD_GROUP") {
    return [...state, action.group];
  }
  return state;
};

export const fetchGroups = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/groups");
    dispatch({ type: "SET_GROUPS", groups: response.data });
  };
};

export const createGroup = (group) => {
  return async (dispatch) => {
    const response = await axios.post("/api/groups", group);
    dispatch({ type: "ADD_GROUP", group: response.data });
    return response.data;
  };
};

export default groups;
