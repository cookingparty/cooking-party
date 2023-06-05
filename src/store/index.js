import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import onlineUsers from "./onlineUsers";
import friends from "./friends";
import recipes from "./recipes";

const reducer = combineReducers({
  auth,
  onlineUsers,
  friends,
  recipes,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./onlineUsers";
export * from "./friends";
export * from "./recipes";
