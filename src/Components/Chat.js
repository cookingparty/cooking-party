import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage } from "../store";
import { HailTwoTone } from "@mui/icons-material";
import { Box, Typography, List, ListItem, TextField, Button } from "@mui/material";

const Chat = ({ drawerWidth }) => {
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
      return null;
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
    <Typography variant="h1" style={{ fontSize: "20px", fontFamily: "Helvetica", textAlign: "center" }}>
      MESSAGES
    </Typography>
    <div id="chats">
      {chats.map((chat, i) => {
        return (
          <Box
            key={i}
            id={`chat-${chat.withUser.id}`} // Unique ID using the user ID
            className={chat.online ? "online" : ""}
            sx={{
              marginTop: '15px',
              overflow: "auto",
              maxHeight: "240px",
              padding: "10px",
              backgroundColor: "#f5f5f5",
              display: "flex",
              flexDirection: "column",
              width: drawerWidth - 40,
            }}
          >
            <div style={{ background: "#f5f5f5", padding: "10px" }}>
              <Typography variant="h3" style={{ fontSize: "14px", fontWeight: "bold", textTransform: "capitalize", textAlign: 'center' }}>
                Chat with {chat.withUser.username || chat.withUser.facebook_username}
                
              </Typography>
            </div>
            <List>
            {chat.messages.map((message) => {
  console.log(chat.withUser);
  return (
    <ListItem
      key={message.id}
      className={message.mine ? "mine" : "yours"}
      sx={{
        backgroundColor: message.mine ? "#ADD8E6" : "#E6E6FA",
      }}
    >
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
              <Typography variant="body1" style={{ fontSize: "12px" }}>
                You are no longer friends. Please add a friend to continue the chat.
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








