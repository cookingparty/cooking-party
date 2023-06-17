import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFriendship, createMessage } from "../store";
import {
  Send,
  ExpandMore as ExpandMoreIcon,
  PersonAdd,
} from "@mui/icons-material";
import Chat from "@mui/icons-material/Chat";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
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


const OnlineUsers = ({ drawerwidth, handleToggleMessages }) => {
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

  const sendRequest = (id) => {
    dispatch(createFriendship({ friender_id: auth.id, friendee_id: id }));
  };

  const isRequested = (user) => {
    if (!!friends.find((f) => f.id === user.id)) {
      return true;
    }
    return false;
  };

  const requests = friends.filter((friend) => {
    const friendship = findFriendship(friend.id);
    return friendship && friendship.status === "PENDING";
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


  const colors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF',
    '#FF00FF', '#C0C0C0', '#808080', '#800000', '#808000',
    '#008000', '#800080', '#008080', '#000080', '#FFA500',
    '#FF4500', '#DA70D6', '#FA8072', '#20B2AA', '#7B68EE'
  ];

  return (
  
<Box
        sx={{
          minHeight: "20px",
          marginTop: "5px",
          overflowY: "auto",
          padding: "10px",
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          width: drawerwidth - 40,
        }}
      >

      
      <div style={{ background: "#f5f5f5", padding: "10px", minHeight: '250px' }}>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    position: "relative",
                    margin: "0",
                    padding: "2px 0",
                  }}
                >
                  <Typography
                    variant="h3"
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      textAlign: "center",

                      marginLeft: "20px",

                    }}
                  >
                    See Who's Online
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ margin: "-5px 0 0", padding: 0 }}>

                  
                  <Box maxHeight="80px" overflow="auto">
                    <List>
                    {onlineUsers.map((user) => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomIndex];

        const avatarStyle =
          user && user.avatar
            ? {
                width: "20px",
                height: "20px",
                marginRight: "3px",
              }
            : {
                width: "20px",
                height: "20px",
                marginRight: "3px",
                color: randomColor,
              };
        return (
          
                      <ListItem
                      key={user.id}

                        sx={{
                          paddingRight: "8px",
                          paddingTop: "0",
                          paddingBottom: "0",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt="User Avatar"
                              style={avatarStyle}
                            />
                          ) : (
                            <AccountCircleRoundedIcon style={avatarStyle} />
                          )}
                          <Typography
                            variant="body1"
                            style={{
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              fontSize: "10px",
                              textTransform: "capitalize",
                              overflowWrap: "break-word",
                              wordWrap: "break-word",
                              hyphens: "auto",
                              whiteSpace: "normal",
                              width: "100%",
                              lineHeight: "10px",
                              maxHeight: "20px",
                              overflow: "hidden",
                            }}
                          >
                            {user.username &&
                              user.username.charAt(0).toUpperCase() +
                                user.username.slice(1)}
                          </Typography>
                        </div>
                        {!isRequested(user) && (
                          <PersonAddAlt1Icon
                            aria-label="Add Friend"
                            color="inherit"
                            onClick={() => {
                              sendRequest(user.id);
                              // dispatch(createMessage({ toId: user.id, txt: "Add Friend" }));

                            }}
                          ></PersonAddAlt1Icon>
                        )}

                        {isRequested(user) && (
                          <IconButton
                            aria-label="let's chat"
                            color="inherit"
                            onClick={() => {
                              handleToggleMessages(user.id)
                              dispatch(
                                createMessage({
                                  toId: user.id,
                                  txt: "Let's Chat",
                                })
                              );
                            }}
                          >
                            <Chat />
                          </IconButton>
                        )}
                      </ListItem>

                      );
                    })}
                    </List>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
          </Box>
  );
};

export default OnlineUsers;
