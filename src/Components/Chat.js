import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage } from "../store";
import { Send, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { Badge } from "@mui/material";
import { Button } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import OnlineFriends from "./OnlineFriends";

const Chat = ({ drawerwidth,  }) => {
  const { messages, auth, onlineUsers, friendships, users } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const [readMessages, setReadMessages] = useState({});
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [expanded, setExpanded] = React.useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setReadMessages([]);
  }, [messages]);

  const handleToggleMessages = (withUserId) => {
    setMessagesOpen(!messagesOpen);

    // Update the read state for the specific chat
    setReadMessages((prevState) => ({
      ...prevState,
      [withUserId]: !messagesOpen, // Toggle the read state for the specific chat
    }));
  };

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
        (message) =>
          (message.fromId === user.id || message.toId === user.id) &&
          message.status !== "DELETED"
      )
    ) {
      return true;
    }
    return false;
  };

  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    "#C0C0C0",
    "#808080",
    "#800000",
    "#808000",
    "#008000",
    "#800080",
    "#008080",
    "#000080",
    "#FFA500",
    "#FF4500",
    "#DA70D6",
    "#FA8072",
    "#20B2AA",
    "#7B68EE",
  ];

  return (
   
    <Box>
       {/* <OnlineFriends/> */}
      <Typography
        variant="h1"
        style={{
          margin: "0px",
          padding: "0px",
          fontSize: "16px",
          fontFamily: "Helvetica",
          textAlign: "center",
        }}
      >
        MESSAGES
      </Typography>

      <div id="chats" style={{ overflowY: "auto" }}>
        {chats.map((chat, i) => {
          const withUserId = chat.withUser.id;
          // const unreadMessages = chat.messages.filter(
          //   (message) =>
          //     !readMessages[withUserId] &&
          //     ((message.fromId === auth.id && message.toId === withUserId) ||
          //       (message.fromId === withUserId && message.toId === auth.id))
          // );

          return (
            <Box
              key={i}
              id={`chat-${chat.withUser.id}`}
              className={chat.online ? "online" : ""}
              sx={{
                marginTop: "15px",
                overflowY: "auto", // adds scrolling to each chat
                maxHeight: "240px",
                // padding: "10px",
                backgroundColor: "#f5f5f5",
                display: "flex",
                flexDirection: "column",
                width: drawerwidth - 40,
              }}
            >
              <div
                style={{
                  background: "#f5f5f5",
                  padding: "10px",
                  minHeight: "400px",
                }}
              >
                <Accordion>
                 <AccordionSummary
                
            
  
  aria-controls={`panel-${chat.withUser.id}-content`}
  id={`panel-${chat.withUser.id}-header`}
  sx={{
    position: "relative",
  }}
>
  <Typography
    variant="h3"
    style={{
      paddingLeft: '5px',
      paddingRight: '5px',
      fontSize: "12px",
      fontWeight: "bold",
      textTransform: "capitalize",
      textAlign: "center",
      height: "50%"
    }}
  >
    Chat with{" "}
    {chat.withUser.username || chat.withUser.facebook_username}
  </Typography>
  <Badge
    badgeContent={!readMessages.length}
    color="primary"
    sx={{
      position: "absolute",
      top: "4px",
      right: "4px",
    }}
  />
</AccordionSummary> 

                <AccordionDetails >
               
 {/* <Typography
    variant="h3"
    style={{
      paddingLeft: '5px',
      paddingRight: '5px',
      fontSize: "12px",
      fontWeight: "bold",
      textTransform: "capitalize",
      textAlign: "center",
      height: "50%"
    }}
  >
    Chat with{" "}
    {chat.withUser.username || chat.withUser.facebook_username}
  </Typography>
  <Badge
    badgeContent={!readMessages.length}
    color="primary"
    sx={{
      position: "absolute",
      top: "4px",
      right: "4px",
    }}
  /> */}
                <List>
                  <Box>
                    {chat.messages.map((message, index) => {
                      console.log(chat.withUser);
                      return (
                        <Box>
                          <ListItem
                            key={message.id}
                            className={message.mine ? "mine" : "yours"}
                            sx={{
                              fontSize: "10px",
                              backgroundColor: message.mine
                                ? "#53c2f5"
                                : "#c383f7",
                              alignSelf: message.mine
                                ? "flex-start"
                                : "flex-end",
                              borderRadius: "12px",
                              // padding: "8px",
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
                        </Box>
                      );
                    })}
                  </Box>
                </List>

                {confirmedFriend(chat.withUser) ? (
                  <form
                    onSubmit={(ev) => {
                      // setExpanded(true);
                      ev.preventDefault();
                      const txt = ev.target.querySelector("textarea").value; // Changed input to textarea
                      dispatch(createMessage({ txt, toId: chat.withUser.id }));
                      ev.target.querySelector("textarea").value = ""; // Changed input to textarea
                    }}
                    style={{
                      display: "flex",
                      width: "100%",
                      marginTop: "5px",
                      position: "relative",
                    }}
                  >
                    <TextField
                      placeholder={`Send a message to ${
                        chat.withUser.username ||
                        chat.withUser.facebook_username
                      }`}
                      sx={{
                        flex: "1",
                        marginRight: "10px",
                        height: "100%",
                        resize: "vertical",
                        overflow: "auto",
                        fontSize: "10px",
                        fontFamily: "Helvetica",
                        marginBottom: "10px",
                        position: "relative",
                      }}
                      multiline
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            type="submit"
                            variant="contained"
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "5px",
                              transform: "translateY(-50%)",
                              textTransform: "none",
                              width: "20px",
                              height: "20px",
                              padding: 0,
                              backgroundColor: "#007aff",
                              borderRadius: "5px",
                            }}
                          >
                            <Send sx={{ fontSize: "10px", color: "#ffffff" }} />
                          </IconButton>
                        ),
                        style: {
                          height: "100%",
                          fontSize: "10px",
                          resize: "vertical",
                          overflow: "auto",
                          maxHeight: "calc(100% - 16px)",
                          fontFamily: "Helvetica",
                          paddingRight: "48px",
                        },
                      }}
                    />
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
                      // marginBottom: "8px",
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                      maxWidth: "80%",
                    }}
                  >
                    You are no longer friends. Please add a friend to continue
                    the chat.
                  </Typography>
                )}
                </AccordionDetails>
                </Accordion>
              </div>
            </Box>
          );
        })}
      </div>
    </Box>
  );
};

export default Chat;
