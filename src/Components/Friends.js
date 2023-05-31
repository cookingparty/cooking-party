import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFriend, unfriend, fetchFriends } from "../store";

const Friends = () => {
  const { friends, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const accept = (id) => {
    dispatch(updateFriend({ id, status: "CONFIRMED", ignored: false }));
  };

  const ignore = (id) => {
    dispatch(updateFriend({ id, status: "IGNORED" }));
  };

  const remove = (id) => {
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
                <button onClick={() => remove(friend.friendship.id)}>
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
                <button onClick={() => accept(friend.friendship.id)}>
                  accept
                </button>
                <button onClick={() => ignore(friend.friendship.id)}>
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
