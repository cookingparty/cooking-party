import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFriendship, deleteFriendship } from "../store";

const FriendRequests = () => {
  const { friendships, auth, users } = useSelector((state) => state);
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

  const acceptRequest = (id) => {
    const friendship = findFriendship(id);
    const friendshipId = friendship.id;
    dispatch(
      updateFriendship({ friendshipId, status: "CONFIRMED" }, friendshipId)
    );
  };

  // const ignoreRequest = (id) => {
  //   const friendship = findFriendship(id);
  //   const friendshipId = friendship.id;
  //   dispatch(
  //     updateFriendship({ friendshipId, status: "IGNORED" }, friendshipId)
  //   );
  // };

 
  return (
    <div>
     
      <h1>Friend Requests</h1>
      <ul>
        {friends
          .filter(
            (friend) =>
              findFriendship(friend.id).friendee_id === auth.id &&
              findFriendship(friend.id).status === "PENDING"
          )
          .map((friend) => {
            if(!friend){
              return null
            }
            return (
              <li key={friend.id}>
                {friend.username || friend.facebook_username}
                <button onClick={() => acceptRequest(friend.id)}>accept</button>
                <button onClick={() => removeFriend(friend.id)}>ignore</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default FriendRequests;
