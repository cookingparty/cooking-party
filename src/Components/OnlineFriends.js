import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage } from "../store";

const OnlineFriends = () => {
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

  const findFriendship = (friendId) => {
    const friendship = friendships.find(
      (friendship) =>
        (friendship.friendee_id === friendId &&
          friendship.friender_id === auth.id) ||
        (friendship.friendee_id === auth.id &&
          friendship.friender_id === friendId)
    );
    return friendship;
  };

  const confirmedFriend = (user) => {
    const friend = friends.find((f) => f.id === user.id);
    if (!!friend && findFriendship(friend.id)) {
      if (findFriendship(friend.id).status === "CONFIRMED") {
        return true;
      }
    }
    return false;
  };

  const onlineFriends = onlineUsers.filter((user) => !!confirmedFriend(user));

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
      <h1>Online Friends ({onlineFriends.length})</h1>
      <ul>
        {onlineFriends.map((user) => {
          return (
            <li key={user.id}>
              {user.username}
              {!hasChat(user) && (
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

export default OnlineFriends;
