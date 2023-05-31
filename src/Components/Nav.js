import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

export default function Nav() {
  const { auth, } = useSelector(state => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let pages = [];
  auth.adminStatus === true ? (pages = ['Home', 'Recipes', 'Meals', 'Cocktails', 'About', 'Admin']) : (pages = ['Home', 'Recipes', 'Meals', 'About', 'Account']);
  let settings = [];
  auth.id
    ? (settings = [ 'Home', 'Recipes', 'Meals', 'About', 'Admin',  'Logout'])
    : (settings = [ 'Home', 'Recipes', 'Meals', 'About', 'Admin',  'Login', ]);

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

  return (

    <AppBar position="static" style={{ background: '#F9F6EE', margin: 0, padding: 0 }}>
    <Container maxWidth="xl" style={{ margin: 0, padding: 0 }}>
        <Toolbar disableGutters>

          {/* Admin link */}
          {auth.adminStatus && (
            <Typography
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              noWrap
              component={Link}
              to="/admin"
              sx={{
                fontSize: 14,
                ml: 2,
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'helvetica',
                fontWeight: 25,
                letterSpacing: '.1rem',
                color: '0C090A',
                textDecoration: 'none',
              }}
            >
              Admin
            </Typography>
          )}

          {/* Main logo */}
          <Box>
            <Link to="/">
              <img
                src="static/images/cooking-party-transparent.png"
                alt="Cooking Party Logo"
                style={{ width: '110px', height: 'auto', paddingLeft: '20px' }}
              />
            </Link>
          </Box>

                   {/* Mobile menu */}
                   <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="0C090A"
            >
              {/* Add menu icon here */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigateTo(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Additional mobile links */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {settings.map((setting) => (
              <Typography
                key={setting}
                noWrap
                component={Link}
                to={`/${setting.toLowerCase()}`}
                sx={{
                  fontSize: 14,
                  ml: 2,
                  flexGrow: 1,
                  fontFamily: 'helvetica',
                  fontWeight: 35,
                  letterSpacing: '.2rem',
                  color: '0C090A',
                  textDecoration: 'none',
                }}
              >
                {setting.toUpperCase()}
              </Typography>
            ))}
          </Box>

          {/* Desktop links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                sx={{ my: 2, color: '0C090A', display: 'block',  marginLeft: '20px', }}
              >
                {page}
              </Button>
            ))}
          </Box>


          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Menu">


              
            <IconButton onClick={handleOpenUserMenu} sx={{ width: 50, height: 50, marginRight: '20px'  }}>
  <Avatar alt="contact-book avatar" src="/static/images/contact-book-black.png" sx={{ width: 40, height: 40, padding: '30px' }} />
</IconButton>




            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => navigateTo(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // <nav>
    //   <Link to="/">Home</Link>
    //   <Link to="/login">Login</Link>
    //   <Link to="/recipes">Recipes</Link>
    //   <Link to="/meals">Meals</Link>
    //   <Link to="/cocktails">Cocktails</Link>
    // </nav>
  );
};


