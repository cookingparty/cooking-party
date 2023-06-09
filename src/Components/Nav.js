import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
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

const Nav = () => {
  const { auth, recipes, onlineUsers, messages, users, friendships } =
    useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = [
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

  const drawerWidth = 240;

  const openedMixin = (theme) => ({
    width: drawerWidth,
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
    padding: theme.spacing(0, 1, ),
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
      marginRight: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const StyledDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        </StyledAppBar>

        {!!auth.id && (
          <StyledDrawer anchor="right" variant="permanent" open={open}>
            <DrawerHeader/>

            <Divider />
            <List>
  {['Online Friends', 'Friend Requests', 'Messages'].map((text, index) => (
    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {index === 0 ? (
            <Badge badgeContent={friendships.length} color="primary">
              <AccountCircleIcon />
            </Badge>
          ) : index === 1 ? (
            <Badge badgeContent={friendships.length} color="primary">
              <PersonAddAlt1Icon />
            </Badge>
          ) : (
            <Badge badgeContent={messages.length} color="primary">
              <MailIcon />
            </Badge>
          )}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  ))}
</List>


<Divider />
<List>
  {['Friends', 'Online Users', 'Logout'].map((text, index) => (
    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {index === 0 ? (
            <Badge badgeContent={friendships.length} color="primary">
              <PersonIcon />
            </Badge>
          ) : index === 1 ? (
            <Badge badgeContent={onlineUsers.length} color="primary">
              <PersonOutlineIcon />
            </Badge>
          ) : (
            <ExitToAppOutlinedIcon />
          )}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  ))}
</List>

<Divider />
<ListItem>
<ListItemText primary="Chat"/>
{!!auth.id && <Chat/>}
</ListItem>
          </StyledDrawer>
        )}
      </Box>
    </Box>
  );
};

export default Nav;
