import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFriendship, createMessage } from "../store";

const OnlineUsers = () => {
  const { onlineUsers, friendships, messages, auth, users } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const friends = friendships
    .filter(
      (friendship) =>
        friendship.friendee_id === auth.id || friendship.friender_id === auth.id
    )
    .map((friendship) => {
      if (friendship.friendee_id === auth.id) {
        return users.find((user) => user.id === friendship.friender_id);
      }
      if (friendship.friender_id === auth.id) {
        return users.find((user) => user.id === friendship.friendee_id);
      }
    });

  const sendRequest = (id) => {
    dispatch(createFriendship({ friender_id: auth.id, friendee_id: id }));
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
