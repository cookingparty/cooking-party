import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFriend, unfriend } from "../store";

const Friends = () => {
  const { friends, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const acceptRequest = (id) => {
    dispatch(updateFriend({ id, status: "CONFIRMED" }));
  };

  const ignoreRequest = (id) => {
    dispatch(updateFriend({ id, status: "IGNORED" }));
  };

  const removeFriend = (id) => {
    dispatch(unfriend(id));
  };

  return (
    <div>
      <h1>Friends</h1>
      <ul>
        {friends
          .filter((friend) => friend.friendship.status === "CONFIRMED")
          .map((friend) => {
            return (
              <li key={friend.id}>
                {friend.username}
                <button onClick={() => removeFriend(friend.friendship.id)}>
                  unfriend
                </button>
              </li>
            );
          })}
      </ul>
      <h1>Friend Requests</h1>
      <ul>
        {friends
          .filter(
            (friend) =>
              friend.friendship.friendee_id === auth.id &&
              friend.friendship.status === "PENDING"
          )
          .map((friend) => {
            return (
              <li key={friend.id}>
                {friend.username}
                <button onClick={() => acceptRequest(friend.friendship.id)}>
                  accept
                </button>
                <button onClick={() => ignoreRequest(friend.friendship.id)}>
                  ignore
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Friends;
