import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import onlineUsers from "./onlineUsers";
import friendships from "./friendships";
import messages from "./messages";
import users from "./users";

const reducer = combineReducers({
  auth,
  onlineUsers,
  messages,
  friendships,
  users,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./onlineUsers";
export * from "./messages";
export * from "./friendships";
export * from "./users";
