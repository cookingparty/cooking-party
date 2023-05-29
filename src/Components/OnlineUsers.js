import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFriend } from "../store";

const OnlineUsers = () => {
  const { onlineUsers } = useSelector((state) => state);
  const dispatch = useDispatch();

  const sendRequest = (id) => {
    dispatch(addFriend(id));
  };

  return (
    <div>
      <h1>Online Users ({onlineUsers.length})</h1>
      <ul>
        {onlineUsers.map((user) => {
          return (
            <li key={user.id}>
              {user.username}
              <button onClick={() => sendRequest(user.id)}>+friend</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OnlineUsers;
