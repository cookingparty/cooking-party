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
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Nav() {
  const { auth } = useSelector(state => state);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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


  
  const settings = ['Profile', 'Settings', 'Logout'];

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
        {/* Dropdown menu (Nav) */}
        {auth.id && (
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
              style={{
                paddingLeft: '20px',
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
        )}

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

        {!auth.id && (
          <IconButton
          component={Link}
          to="/facebook/cookingparty"
          aria-label="facebook page"
          color="inherit"
          >
            <FacebookIcon style={{ color: '#4688fa'}} />
          </IconButton>
        )} 

{!auth.id && (
          <IconButton
          component={Link}
          to="/instagram/cookingparty"
          aria-label="instagram page"
          color="inherit"
          >
            <InstagramIcon style={{ color: '#fa4c46'}} />
          </IconButton>
        )} 

        {/* Favorite icon */}
        {!!auth.id && (
          <IconButton
            component={Link}
            to="/my-saved-recipes"
            aria-label="favorite recipes"
            color="inherit"
          >
            <FavoriteIcon style={{ color: '#ed6fb7' }} />
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
            <ChatIcon style={{ color: '#6fc5ed' }} />
          </IconButton>
        )}

        {/* Dropdown menu (User) */}
        {!!auth.id && (
          <Box>
            <IconButton
              size="large"
              aria-label="user menu"
              aria-controls="user-menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="user-menu-appbar"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                style: {
                  background: 'white'
                }
              }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => navigateTo(setting.toLowerCase())} style={{ color: 'black' }}>
                  <Typography variant="body1">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        {/* Login link */}
        {!auth.id && (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              variant="button"
              component={Link}
              to="/login"
              style={{
                color: '#0C090A',
                textDecoration: 'none',
                paddingRight: '20px',
              }}
            >
              Login / Register
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
