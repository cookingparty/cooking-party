import axios from "axios";

const groups = (state = [], action) => {
  if (action.type === "SET_GROUPS") {
    return action.groups;
  }
  return state;
};

export const fetchGroups = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/groups");
    dispatch({ type: "SET_GROUPS", groups: response.data });
  };
};

export default groups;
