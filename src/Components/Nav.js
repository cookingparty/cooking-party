import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Nav() {
  const { auth } = useSelector(state => state);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const pages = [
    'Recipes',
    'Planner',
    'Grocery List',
    'About',
    'Friends',
    'Groups',
    'My Saved Recipes',
    'Add Recipe'
  ];

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigateTo = page => {
    navigate(`/${page.toLowerCase()}`);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static" style={{ background: '#F9F6EE', margin: 0, padding: 0 }}>
      <Toolbar disableGutters>
        {/* Dropdown menu */}
        <Box sx={{ flexGrow: 1 }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="black"
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
                background: 'white'
              }
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={() => navigateTo(page)} style={{ color: 'black' }}>
                <Typography variant="body1">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Logo */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Link to="/">
            <img
              src="static/images/cooking-party-transparent.png"
              alt="Cooking Party Logo"
              style={{ width: '110px', height: 'auto' }}
            />
          </Link>
        </Box>

        {/* Favorite icon */}
        <IconButton
          component={Link}
          to="/my-saved-recipes"
          aria-label="favorite recipes"
          color="inherit"
        >
          <FavoriteIcon style={{ color: '#ed6fb7' }} />
        </IconButton>

        {/* Chat icon */}
        <IconButton
          component={Link}
          to="/chat"
          aria-label="chat"
          color="inherit"
        >
          <ChatIcon style={{ color: '#6fc5ed' }} />
        </IconButton>

        {/* Login link */}
        <Typography
          variant="button"
          component={Link}
          to="/login"
          style={{
            color: '#0C090A',
            textDecoration: 'none',
            fontWeight: 'bold',
            paddingRight: '20px', // Add padding on the right
          }}
        >
          Login / Register
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
