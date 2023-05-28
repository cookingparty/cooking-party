import React from "react";
import { useSelector, useDispatch } from "react-redux";

const OnlineUsers = () => {
  const { onlineUsers } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(onlineUsers);

  return (
    <div>
      <h1>Online Users ({onlineUsers.length})</h1>
      <ul>
        {onlineUsers.map((user) => {
          return <li key={user.id}>{user.username}</li>;
        })}
      </ul>
    </div>
  );
};

export default OnlineUsers;
