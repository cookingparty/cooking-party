import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage, updateFriendship } from "../store";
import { Send, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
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
} from "@mui/material";

const FriendRequests = ({drawerwidth}) => {
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

  const removeFriend = (id) => {
    const friendship = findFriendship(id);
    const friendshipId = friendship.id;
    dispatch(
      updateFriendship({ friendshipId, status: "IGNORED" }, friendshipId)
    );
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
        variant="h2"
        style={{
          fontSize: "16px",
          fontFamily: "Helvetica",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        FRIEND REQUESTS
      </Typography>
      {friends
        .filter((friend) =>
          findFriendship(friend.id).friendee_id === auth.id &&
          findFriendship(friend.id).status === "PENDING"
        )
        .map((friend) => {
          const randomIndex = Math.floor(Math.random() * colors.length);
          const randomColor = colors[randomIndex];

          const avatarStyle = friend && friend.avatar
            ? {
                width: '20px',
                height: '20px',
                marginRight: '3px'
              }
            : {
                width: '20px',
                height: '20px',
                marginRight: '3px',
                color: randomColor
              };

          if (!friend) {
            return null;
          }

          return (
            <Box
              key={friend.id}
              sx={{
                marginTop: "10px",
                overflowY: "auto",
                padding: "10px",
                backgroundColor: "#f5f5f5",
                display: "flex",
                flexDirection: "column",
                width: drawerwidth - 40,
              }}
            >
              <div style={{ background: "#f5f5f5", padding: "10px" }}>
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
                      See Friend Requests
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ margin: '-5px 0 0', padding: 0 }}>
                    <Box maxHeight="80px" overflow="auto"></Box>
                  <List>
  <ListItem
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
      {friend.avatar ? (
        <img
          src={friend.avatar}
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
        }}
      >
        {friend.username || friend.facebook_username}
      </Typography>
    </div>

    <IconButton
      onClick={() => acceptRequest(friend.id)}
      aria-label="add friend"
      color="inherit"
    >
      <PersonAddAlt1Icon />
    </IconButton>
    <IconButton
      onClick={() => removeFriend(friend.id)}
      aria-label="remove friend"
      color="inherit"
    >
      <PersonRemoveAlt1Icon />
    </IconButton>
  </ListItem>
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

export default FriendRequests;
