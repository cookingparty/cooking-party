import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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

export default function Nav() {
  const { auth, recipes } = useSelector((state) => state);
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
    if (page === "Add Recipe") {
      navigate("/recipes/upload");
    }
    navigate(`/${page.toLowerCase()}`);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSearch = (filteredRecipes) => {
    // Handle the filtered recipes here
    console.log(filteredRecipes);
  };

  return (
    <AppBar
      position="static"
      style={{ background: "#F9F6EE", margin: 0, padding: 0 }}
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
          <Search onSearch={handleSearch} />
        </Box>

        {/* Logo */}
        <Box sx={{ flexGrow: "1.3", display: "flex", alignItems: "center" }}>
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
            component={Link}
            to="/chat"
            aria-label="chat"
            color="inherit"
          >
            <ChatIcon style={{ color: "#6fc5ed" }} />
          </IconButton>
        )}

        {/* Dropdown menu (User) */}
        {!!auth.id && <Dashboard />}

        {/* Social media icons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!auth.id && (
            <>
              <IconButton
                component={Link}
                to="/instagram/cookingparty"
                aria-label="instagram page"
                color="inherit"
              >
                <InstagramIcon style={{ color: "#fa4c46" }} />
              </IconButton>

              <IconButton
                component={Link}
                to="/facebook/cookingparty"
                aria-label="facebook page"
                color="inherit"
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
              to="/login"
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
    </AppBar>
  );
}
