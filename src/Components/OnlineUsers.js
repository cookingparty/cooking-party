import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFriend, createMessage } from "../store";

const OnlineUsers = () => {
  const { onlineUsers, friends, messages } = useSelector((state) => state);
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

  const confirmedFriend = (user) => {
    const friend = friends.find((f) => f.id === user.id);
    if (!!friend && friend.friendship) {
      if (friend.friendship.status === "CONFIRMED") {
        return true;
      }
    }
    return false;
  };

  const hasChat = (user) => {
    if (
      messages.find(
        (message) => message.fromId === user.id || message.toId === user.id
      )
    ) {
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
              {!hasChat(user) && !!confirmedFriend(user) && (
                <button
                  onClick={() => {
                    dispatch(
                      createMessage({ toId: user.id, txt: "let's chat" })
                    );
                  }}
                >
                  start chat
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OnlineUsers;
