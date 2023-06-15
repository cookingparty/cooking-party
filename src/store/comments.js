import axios from "axios";

const comments = (state = [], action) => {
  if (action.type === "SET_COMMENTS") {
    return action.comments;
  }
  if (action.type === "CREATE_COMMENT") {
    state = [...state, action.comment];
  }
  return state;
};

export const fetchComments = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/comments");
    dispatch({ type: "SET_COMMENTS", comments: response.data });
  };
};

export const createComment = (comment) => {
  return async (dispatch) => {
    const response = await axios.post("/api/comments", comment);
    dispatch({ type: "CREATE_COMMENT", comment: response.data });
  };
};

export default comments;
