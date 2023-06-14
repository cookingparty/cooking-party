import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import onlineUsers from "./onlineUsers";
import friendships from "./friendships";
import messages from "./messages";
import users from "./users";
import recipes from "./recipes";
import groups from "./groups";
import memberships from "./memberships";
import favorites from "./favorites";
import day from "./meals";
import ingredients from "./ingredients";

const reducer = combineReducers({
  auth,
  onlineUsers,
  messages,
  friendships,
  users,
  recipes,
  groups,
  memberships,
  favorites,
  day,
  ingredients,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./onlineUsers";
export * from "./messages";
export * from "./friendships";
export * from "./users";
export * from "./recipes";
export * from "./groups";
export * from "./memberships";
export * from "./favorites";
export * from "./meals";
export * from "./ingredients";
