import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
// import {handleToggleMessages} from "./Toggles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Search from "./Search";
import { Container, TextField } from "@mui/material";
import Dashboard from "./Dashboard";
import SearchAll from "./SearchALL";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Chat from "./Chat";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import OnlineFriends from "./OnlineFriends";
import OnlineUsers from "./OnlineUsers";
import Friends from "./Friends";
import FriendRequests from "./FriendRequests";

// add this if needed into Nav=({handleToggleMessages})

const Nav = () => {
  const { auth, recipes, onlineUsers, messages, users, friendships } =
    useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = [
    "Home",
    "Recipes",
    "Planner",
    "Grocery List",
    "About",
    "Friends",
    "Groups",
    "My Saved Recipes",
    "Add Recipe",
  ];

  const settings = ["Profile", "Settings", "Logout"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = (page) => {
    if (page === `Add Recipe`) {
      navigate("/recipes/upload");
    } else if (page === "My Saved Recipes") {
      navigate("/my-saved-recipes");
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
  };

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  const handleSearch = (filteredRecipes) => {
    // Handle the filtered recipes here
    console.log(filteredRecipes);
  };

  //{* Chat Drawer *}

  const drawerwidth = 240;

  const openedMixin = (theme) => ({
    width: drawerwidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    margin: "23px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginRight: drawerwidth,
      width: `calc(100% - ${drawerwidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const StyledDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerwidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [readMessages, setReadMessages] = useState([]);
  const [onlineFriendsOpen, setOnlineFriendsOpen] = useState(false);
  const [readOnlineFriends, setReadOnlineFriends] = useState([]);
  const [onlineUsersOpen, setOnlineUsersOpen] = useState(false);
  const [readOnlineUsers, setReadOnlineUsers] = useState([]);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [readFriends, setReadFriends] = useState([]);
  const [friendRequestsOpen, setFriendRequestsOpen] = useState(false);
  const [readFriendRequests, setReadFriendRequests] = useState([]);

  const [friendRequests, setFriendRequests] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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

  const confirmedFriends = friends.filter((friend) => {
    const friendship = findFriendship(friend.id ? friend.id : null);
    return friendship && friendship.status === "CONFIRMED";
  });

  const requests = friends.filter((friend) => {
    const friendship = findFriendship(friend.id);
    return friendship && friendship.status === "PENDING";
  });

  const handleToggleMessages = () => {
    console.log("hello");
    if (messagesOpen) {
      setMessagesOpen(false);
    } else {
      setMessagesOpen(true);
      setOnlineFriendsOpen(false);
      setFriendsOpen(false);
      setOnlineUsersOpen(false);
      setFriendRequestsOpen(false);
    }
    setReadMessages(messages.map((message) => message.id));
  };

  const handleToggleOnlineFriends = () => {
    if (onlineFriendsOpen) {
      setOnlineFriendsOpen(false);
    } else {
      setOnlineFriendsOpen(true);
      setMessagesOpen(false);
      setFriendsOpen(false);
      setOnlineUsersOpen(false);
      setFriendRequestsOpen(false);
    }
    setReadOnlineFriends(onlineFriends.map((onlineFriend) => onlineFriend.id));
  };

  const handleToggleFriends = () => {
    if (friendsOpen) {
      setFriendsOpen(false);
    } else {
      setFriendsOpen(true);
      setMessagesOpen(false);
      setOnlineFriendsOpen(false);
      setOnlineUsersOpen(false);
      setFriendRequestsOpen(false);
    }
    setReadFriends(friends.map((friend) => friend.id));
  };

  const handleToggleOnlineUsers = () => {
    if (onlineUsersOpen) {
      setOnlineUsersOpen(false);
    } else {
      setOnlineUsersOpen(true);
      setMessagesOpen(false);
      setOnlineFriendsOpen(false);
      setFriendsOpen(false);
      setFriendRequestsOpen(false);
    }
    setReadOnlineUsers(onlineUsers.map((onlineUser) => onlineUser.id));
  };

  const handleToggleFriendRequests = () => {
    if (friendRequestsOpen) {
      setFriendRequestsOpen(false);
    } else {
      setFriendRequestsOpen(true);
      setMessagesOpen(false);
      setOnlineFriendsOpen(false);
      setFriendsOpen(false);
      setOnlineUsersOpen(false);
    }
    setReadFriendRequests(friendRequests.map((request) => request.id));
  };

  useEffect(() => {
    setReadMessages([]);
  }, [messages]);

  useEffect(() => {
    setReadOnlineFriends([]);
  }, [friendships]);

  useEffect(() => {
    setReadFriends([]);
  }, [friendships]);

  useEffect(() => {
    setReadOnlineUsers([]);
  }, [onlineUsers]);

  useEffect(() => {
    setReadFriendRequests([]);
  }, [friendships]);

  return (
    <Box sx={{ display: "flex", marginBottom: "100px" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar
          position="fixed"
          open={open}
          sx={{ background: "#F9F6EE" }}
        >
          <Toolbar disableGutters>
            {/* Dropdown menu (Nav) */}
            {auth.id && (
              <Box>
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="black"
                  style={{
                    paddingLeft: "20px",
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  PaperProps={{
                    style: {
                      background: "white",
                    },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => navigateTo(page)}
                      style={{ color: "black" }}
                    >
                      <Typography variant="body1">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}

            {/* Search bar */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: "20px",
              }}
            >
              <SearchAll onSearch={handleSearch} />
            </Box>

            {/* Logo */}
            <Box
              sx={{ flexGrow: "1.3", display: "flex", alignItems: "center" }}
            >
              <Link to="/">
                <img
                  src="static/images/cooking-party-transparent.png"
                  alt="Cooking Party Logo"
                  style={{ width: "110px", height: "auto" }}
                />
              </Link>
            </Box>

            {/* Favorite icon */}
            {!!auth.id && (
              <IconButton
                component={Link}
                to="/my-saved-recipes"
                aria-label="favorite recipes"
                color="inherit"
              >
                <FavoriteIcon style={{ color: "#ed6fb7" }} />
              </IconButton>
            )}

            {/* Chat icon */}
            {!!auth.id && (
              <IconButton
                aria-label="open drawer"
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                edge="start"
                sx={{
                  marginLeft: "5px",
                }}
                color="inherit"
              >
                <ChatIcon style={{ color: "#6fc5ed" }} />
              </IconButton>
            )}

            {/* Dropdown menu (User) */}
            {!!auth.id && (
              <Dashboard
                style={{
                  marginRight: "20px",
                }}
              />
            )}

            {/* Social media icons */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!auth.id && (
                <>
                  <IconButton
                    component={Link}
                    to="https://www.instagram.com/thecookingparty/"
                    aria-label="instagram page"
                    color="inherit"
                    target="_blank"
                  >
                    <InstagramIcon style={{ color: "#fa4c46" }} />
                  </IconButton>

                  <IconButton
                    component={Link}
                    to="https://www.facebook.com/profile.php?id=100093276614788"
                    aria-label="facebook page"
                    color="inherit"
                    target="_blank"
                  >
                    <FacebookIcon style={{ color: "#4688fa" }} />
                  </IconButton>
                </>
              )}

              {/* Login link */}
              {!auth.id && (
                <Typography
                  variant="button"
                  component={Link}
                  to="/auth/login"
                  style={{
                    color: "#0C090A",
                    textDecoration: "none",
                    paddingLeft: "10px",
                    paddingRight: "20px",
                    fontFamily: "Helvetica",
                  }}
                >
                  Login / Register
                </Typography>
              )}
            </Box>
          </Toolbar>

          {/* Hello username */}
          {auth.id && (
            <Box
              sx={{
                textTransform: "capitalize",
                position: "absolute",
                bottom: 0,
                right: 0,
                marginRight: "20px",
                marginBottom: "8px",
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontFamily: "Helvetica", color: "black" }}
              >
                Hello {auth.username || auth.facebook_username}!
              </Typography>
            </Box>
          )}
        </StyledAppBar>

        {!!auth.id && (
          <StyledDrawer
            anchor="right"
            variant="permanent"
            open={open}
            sx={{ marginBottom: "40px" }}
          >
            <DrawerHeader>
            <Box
          sx={{ justifyContent: open ? "inital" : "center", padding: '20', background: "#F9F6EE",  fontSize: '10px', font: 'Helvetica'}}
          >
          <Typography
       sx={{fontSize: '10px', font: 'Helvetica',}}
          >
            FRIENDS AND MESSENGER
          </Typography>
          </Box>
            </DrawerHeader>

            <Divider />
            <List>
              {[
                "Online Friends",
                "Friend Requests",
                "Messages",
                "Friends",
                "Online Users",
              ].map((text, index) => (
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    disabled={!open}
                    key={text}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => {
                      if (index === 0) {
                        handleToggleOnlineFriends();
                      } else if (index === 1) {
                        handleToggleFriendRequests();
                      } else if (index === 2) {
                        handleToggleMessages();
                      } else if (index === 3) {
                        handleToggleFriends();
                      } else if (index === 4) {
                        handleToggleOnlineUsers();
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {index === 0 ? (
                        <Badge
                          badgeContent={onlineFriends.length}
                          color="primary"
                        >
                          <AccountCircleIcon />
                        </Badge>
                      ) : index === 1 ? (
                        <Badge badgeContent={requests.length} color="primary">
                          <PersonAddAlt1Icon />
                        </Badge>
                      ) : index === 2 ? (
                        <Badge
                          badgeContent={
                            messages.filter(
                              (message) => !readMessages.includes(message.id)
                            ).length
                          }
                          color="primary"
                        >
                          <MailIcon />
                        </Badge>
                      ) : index === 3 ? (
                        <Badge
                          badgeContent={confirmedFriends.length}
                          color="primary"
                        >
                          <PersonIcon />
                        </Badge>
                      ) : index === 4 ? (
                        <Badge
                          badgeContent={onlineUsers.length}
                          color="primary"
                        >
                          <PersonOutlineIcon />
                        </Badge>
                      ) : (
                        <ExitToAppOutlinedIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Divider />
            <ListItem>
              <Box sx={{ overflowY: "auto", height: "calc(100% - 64px)" }}>
                {!!auth.id && messagesOpen && (
                  <Chat drawerwidth={drawerwidth} />
                )}
              </Box>
            </ListItem>

            {/* <Divider/> */}
            <ListItem sx={{ marginTop: "0", marginBottom: "0" }}>
              <Box
                sx={{
                  overflowY: "auto",
                  height: "calc(100% - 64px)",
                  marginTop: "-10px",
                }}
              >
                {!!auth.id && onlineFriendsOpen && (
                  <OnlineFriends drawerwidth={drawerwidth} />
                )}
              </Box>
            </ListItem>

            {/* <Divider /> */}
            <ListItem sx={{ marginTop: "0", marginBottom: "0" }}>
              <Box
                sx={{
                  overflowY: "auto",
                  height: "calc(100% - 64px)",
                  marginTop: "-10px",
                }}
              >
                {!!auth.id && friendsOpen && (
                  <Friends drawerwidth={drawerwidth} />
                )}
              </Box>
            </ListItem>

            {/* <Divider /> */}
            <ListItem sx={{ marginTop: "0", marginBottom: "0" }}>
              <Box
                sx={{
                  overflowY: "auto",
                  height: "calc(100% - 64px)",
                  marginTop: "-10px",
                }}
              >
                {!!auth.id && friendRequestsOpen && (
                  <FriendRequests drawerwidth={drawerwidth} />
                )}
              </Box>
            </ListItem>

            {/* <Divider /> */}
            <ListItem sx={{ marginTop: "0", marginBottom: "0" }}>
              <Box
                sx={{
                  overflowY: "auto",
                  height: "calc(100% - 64px)",
                  marginTop: "-10px",
                }}
              >
                {!!auth.id && onlineUsersOpen && (
                  <OnlineUsers
                    handleToggleMessages={handleToggleMessages}
                    drawerwidth={drawerwidth}
                  />
                )}
                {!!auth.id && onlineUsersOpen && findFriendship === "PENDING" && (
                  <OnlineUsers
                    handleToggleFriendRequests={handleToggleFriendRequests}
                    drawerwidth={drawerwidth}
                  />
                )}
              </Box>
            </ListItem>
          </StyledDrawer>
        )}
      </Box>
    </Box>
  );
};

export default Nav;
