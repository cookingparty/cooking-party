import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage } from "../store";
import { Send, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { IconButton, Accordion, AccordionSummary, AccordionDetails, Box, Typography, List, ListItem, TextField } from "@mui/material";

const OnlineFriends = ({ drawerWidth }) => {
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
    <Box>
      
    <Typography
      variant="h1"
      style={{
        fontSize: "16px",
        fontFamily: "Helvetica",
        textAlign: "center",
      }}
    >
      ONLINE FRIENDS 
      </Typography>
      <div id="onlineFriends" style={{ overflowY: "auto" }}></div>
      
        {onlineFriends.map((user) => {
          return (
            <Box
            key={user.id}
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
            <Accordion>
                <AccordionSummary
  expandIcon={ <ExpandMoreIcon />
  }
  // aria-controls={`panel-${user.id}-content`}
  // id={`panel-${user.id}-header`}
  sx={{
    position: "relative",
  }}
>
<Typography
    variant="h3"
    style={{
      fontSize: "12px",
      fontWeight: "bold",
      textTransform: "capitalize",
      textAlign: "center",
    }}
  >
    See Online Friends
  </Typography>
  </AccordionSummary>
  <AccordionDetails>
            <List key={user.id}>
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
            </List>
            </AccordionDetails>
                </Accordion>
            </div>
            </Box>
          );
        
        })}
      
      
      </Box>
  
  
  );
};

export default OnlineFriends;
