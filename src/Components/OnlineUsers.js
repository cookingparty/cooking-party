import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFriend } from "../store";

const OnlineUsers = () => {
  const { onlineUsers, friends } = useSelector((state) => state);
  const dispatch = useDispatch();

  const sendRequest = (id) => {
    dispatch(addFriend(id));
  };

  const isRequested = (user) => {
    if (!!friends.find((f) => f.id === user.id)) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <h1>Online Users ({onlineUsers.length})</h1>
      <ul>
        {onlineUsers.map((user) => {
          return (
            <li key={user.id}>
              {user.username}
              {!isRequested(user) && (
                <button onClick={() => sendRequest(user.id)}>+friend</button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OnlineUsers;
