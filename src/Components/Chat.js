import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage } from "../store";
import { Send } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
} from "@mui/material";

const Chat = ({ drawerWidth }) => {
  const { messages, auth, onlineUsers, friendships, users } = useSelector(
    (state) => state
  );
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
    <Typography
      variant="h1"
      style={{
        fontSize: "16px",
        fontFamily: "Helvetica",
        textAlign: "center",
      }}
    >
      MESSAGES
    </Typography>
    <div id="chats" style={{ overflowY: "auto" }}>
      {chats.map((chat, i) => {
        return (
          <Box
            key={i}
            id={`chat-${chat.withUser.id}`}
            className={chat.online ? "online" : ""}
            sx={{
              marginTop: "15px",
              overflowY: "auto",
              maxHeight: "240px",
              padding: "10px",
              backgroundColor: "#f5f5f5",
              display: "flex",
              flexDirection: "column",
              width: drawerWidth - 40,
            }}
          >
            <div style={{ background: "#f5f5f5", padding: "10px" }}>
              <Typography
                variant="h3"
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  textAlign: "center",
                }}
              >
                Chat with{" "}
                {chat.withUser.username || chat.withUser.facebook_username}
              </Typography>
            </div>
            <List>
              {chat.messages.map((message, index) => {
                console.log(chat.withUser);
                return (
                  <ListItem
                    key={message.id}
                    className={message.mine ? "mine" : "yours"}
                    sx={{
                      fontSize: "10px",
                      backgroundColor: message.mine ? "#53c2f5" : "#c383f7",
                      alignSelf: message.mine ? "flex-start" : "flex-end",
                      borderRadius: "12px",
                      padding: "8px",
                      marginBottom: "8px",
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                      maxWidth: "80%",
                      marginTop: index === 0 ? "5px" : 0,
                      marginLeft: message.mine ? 0 : "auto",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "10px",
                        color: message.mine ? "#FFFFFF" : "#FFFFFF",
                      }}
                    >
                      {message.txt}
                    </Typography>
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
 style={{
   display: "flex",
   width: "100%",
   marginTop: "10px",
   position: "relative",
 }}
>
 <TextField
   placeholder={`Send message to ${
     chat.withUser.username || chat.withUser.facebook_username
   }`}
   sx={{
     flex: "1",
     marginRight: "10px",
     height: "50%",
     resize: "vertical",
     overflow: "auto",
     fontSize: "10px",
     fontFamily: "Helvetica",
   }}
   multiline
   InputProps={{
     style: {
       height: "50%",
       fontSize: "10px",
       resize: "vertical",
       overflow: "auto",
       maxHeight: "calc(100% - 16px)",
       fontFamily: "Helvetica",
       paddingRight: "48px",
     },
   }}
 />
   <IconButton
     type="submit"
     variant="contained"
     style={{
      position: 'absolute',
      top: '50%',
      marginRight: "10px",
      marginBottom: "20px",
      transform: "translateY(-50%)",
      textTransform: "none",
       width: "30px",
       height: "30px",
       padding: 0,
       backgroundColor: "#007aff",
       borderRadius: "5px",
       position: "absolute",
       right: "5px",
       bottom: "8px",
     }}
   >
     <Send sx={{ fontSize: "10px", color: "#ffffff" }} />
   </IconButton>

</form>



 
            ) : (
              <Typography
  variant="body1"
  style={{
    fontSize: "10px",
    backgroundColor: "limegreen",
    color: "white",
    padding: "8px",
    borderRadius: "12px",
    alignSelf: "flex-start",
    marginBottom: "8px",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
    maxWidth: "80%",
  }}
>
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

