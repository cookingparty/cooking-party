import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage } from "../store";
import { HailTwoTone } from "@mui/icons-material";
import { Box, Typography, List, ListItem, TextField, Button } from "@mui/material";

const Chat = () => {
  const { messages, auth, onlineUsers, friendships, users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const chatMap = messages.reduce((acc, message) => {
    const withUser = message.fromId === auth.id ? message.to : message.from;
    const online = onlineUsers.find((user) => user.id === withUser.id);
    acc[withUser.id] = acc[withUser.id] || { messages: [], withUser, online };
    acc[withUser.id].messages.push({
      ...message,
      mine: auth.id === message.fromId,
    });
    return acc;
  }, {});

  const chats = Object.values(chatMap);

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

  const confirmedFriend = (user) => {
    const friend = friends.find((f) => f.id === user.id);
    if (!!friend && findFriendship(friend.id)) {
      if (findFriendship(friend.id).status === "CONFIRMED") {
        return true;
      }
    }
    return false;
  };

  return (
    <Box>
      <Typography variant="h1">Chat</Typography>
      <div id="chats">
        {chats.map((chat, i) => {
          return (
            <Box
              key={i}
              id="chat"
              className={chat.online ? "online" : ""}
              sx={{
                overflowY: "auto",
                maxHeight: "240px",
                padding: "10px",
                backgroundColor: chat.withUser.id === auth.id ? "blue" : "lightgreen",
              }}
            >
              <Typography variant="h3">
                {chat.withUser.username || chat.withUser.facebook_username}
              </Typography>
              <List>
                {chat.messages.map((message) => {
                  console.log(chat.withUser);
                  return (
                    <ListItem
                      key={message.id}
                      className={message.mine ? "mine" : "yours"}
                    >
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {message.mine ? "you" : chat.withUser.username || chat.withUser.facebook_username}:
                      </Typography>
                      <Typography variant="body1">{message.txt}</Typography>
                    </ListItem>
                  );
                })}
              </List>
              {confirmedFriend(chat.withUser) ? (
                <form
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    const txt = ev.target.querySelector("input").value;
                    dispatch(createMessage({ txt, toId: chat.withUser.id }));
                    ev.target.querySelector("input").value = "";
                  }}
                >
                  <TextField
                    placeholder={`send message to ${
                      chat.withUser.username || chat.withUser.facebook_username
                    }`}
                  />
                  <Button type="submit">Send</Button>
                </form>
              ) : (
                <Typography variant="body1">
                  You are no longer friends. Please add friend to continue chat.
                </Typography>
              )}
            </Box>
          );
        })}
      </div>
    </Box>
  );
};

export default Chat;










// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { createMessage } from "../store";
// import { HailTwoTone } from "@mui/icons-material";

// const Chat = () => {
//   const { messages, auth, onlineUsers, friendships, users } = useSelector((state) => state);
//   const dispatch = useDispatch();

//   const chatMap = messages.reduce((acc, message) => {
//     const withUser = message.fromId === auth.id ? message.to : message.from;
//     const online = onlineUsers.find((user) => user.id === withUser.id);
//     acc[withUser.id] = acc[withUser.id] || { messages: [], withUser, online };
//     acc[withUser.id].messages.push({
//       ...message,
//       mine: auth.id === message.fromId,
//     });
//     return acc;
//   }, {});


//   const chats = Object.values(chatMap);
  
//   const findFriendship = (friendId) => {
//     const friendship = friendships.find(
//       (friendship) =>
//         (friendship.friendee_id === friendId &&
//           friendship.friender_id === auth.id) ||
//         (friendship.friendee_id === auth.id &&
//           friendship.friender_id === friendId)
//     );
//     return friendship;
//   };

//   const friends = friendships
//   .filter(
//     (friendship) =>
//       friendship.friendee_id === auth.id || friendship.friender_id === auth.id
//   )
//   .map((friendship) => {
//     if (friendship.friendee_id === auth.id) {
//       return users.find((user) => user.id === friendship.friender_id);
//     }
//     if (friendship.friender_id === auth.id) {
//       return users.find((user) => user.id === friendship.friendee_id);
//     }
//   });

//   const confirmedFriend = (user) => {
//     const friend = friends.find((f) => f.id === user.id);
//     if (!!friend && findFriendship(friend.id)) {
//       if (findFriendship(friend.id).status === "CONFIRMED") {
//         return true;
//       }
//     }
//     return false;
//   };

//   return (
//     <div>
//       <h1>Chat</h1>
//       <div id="chats">
//         {chats.map((chat, i) => {
//           return (
//             <div key={i} id="chat" className={chat.online ? "online" : ""}>
//               <h3>{chat.withUser.username || chat.withUser.facebook_username}</h3>
//               <ul className="chat">
//                 {chat.messages.map((message) => {
//                   console.log(chat.withUser)
//                   return (
//                     <li
//                       key={message.id}
//                       className={message.mine ? "mine" : "yours"}
//                     >
//                       <span className="fromLabel">
//                         {message.mine ? "you" : chat.withUser.username || chat.withUser.facebook_username}:
//                       </span>
//                       {message.txt}
//                     </li>
//                   );
//                 })}
//               </ul>
//               {confirmedFriend(chat.withUser) &&
//               <form
//                 onSubmit={(ev) => {
//                   ev.preventDefault();
//                   const txt = ev.target.querySelector("input").value;
//                   dispatch(createMessage({ txt, toId: chat.withUser.id }));
//                   ev.target.querySelector("input").value = "";
//                 }}
//               >
//                 <input
//                   placeholder={`send message to ${chat.withUser.username || chat.withUser.facebook_username}`}
//                 />
//               </form>
//         }
//               {!confirmedFriend(chat.withUser) &&
              
//               <p>You are no longer friends. Please add friend to continue chat.</p>
//               }
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Chat;
