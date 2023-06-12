import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage } from "../store";
import Chat from "@mui/icons-material/Chat";
import { Send, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
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

const OnlineFriends = ({ drawerwidth }) => {
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

  const colors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF',
    '#FF00FF', '#C0C0C0', '#808080', '#800000', '#808000',
    '#008000', '#800080', '#008080', '#000080', '#FFA500',
    '#FF4500', '#DA70D6', '#FA8072', '#20B2AA', '#7B68EE'
  ];

  return (
    <Box>
      <Typography
        variant="h1"
        style={{
          fontSize: "16px",
          fontFamily: "Helvetica",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        ONLINE FRIENDS
      </Typography>
      <div id="onlineFriends" style={{ overflowY: "auto" }}></div>

      {onlineFriends.map((user) => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomIndex];

        const avatarStyle = user && user.avatar ? {
          width: '20px',
          height: '20px',
          marginRight: '3px'
        } : {
          width: '20px',
          height: '20px',
          marginRight: '3px',
          color: randomColor
        };

        return (
          <Box
            key={user.id}
            sx={{
              marginTop: "10px",
              overflowY: "auto",
              // maxHeight: "240px",
              padding: "10px",
              backgroundColor: "#f5f5f5",
              display: "flex",
              flexDirection: "column",
              width: drawerwidth - 40,
            }}
          >
            <div style={{ background: "#f5f5f5", padding: "10px",  }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    position: 'relative',
                    margin: '0',
                    padding: '2px 0',
                  }}
                >
                  <Typography
                    variant="h3"
                    style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      textAlign: 'center',
                      marginLeft: '8px'
                    }}
                  >
                    See Online Friends
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ margin: '-5px 0 0', padding: 0 }}>
  <Box maxHeight="80px" overflow="auto">
    <List>
      <ListItem sx={{ paddingRight: "8px", paddingTop: '0', paddingBottom: '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
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
              fontSize: '10px',
              textTransform: 'capitalize',
              overflowWrap: "break-word",
              wordWrap: "break-word",
              hyphens: "auto",
              whiteSpace: "normal",
              width: "100%"
            }}
          >
            {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
          </Typography>
        </div>
        {!hasChat(user) && (
          <IconButton
            aria-label="let's chat"
            color="inherit"
            onClick={() => {
              dispatch(createMessage({ toId: user.id, txt: "Let's Chat" }));
            }}
          >
            <Chat />
          </IconButton>
        )}
      </ListItem>
    </List>
  </Box>
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
