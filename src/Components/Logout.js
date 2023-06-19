import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Logout = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _logout = (user) => {
    dispatch(logout(user));
    navigate('/');
  };

  return (
    <Box
      sx={{
        marginBottom: "60px",

        minHeight: "100vh",
        display: "grid",
        gridtemplaterows: "1fr auto",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom="120px"
      >
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "almond",
            margin: "60px",
            marginBottom: "80px",
            border: "40px solid almond",
            height: "400px",
            width: "700px",
          }}
        >
     

      {auth.id ? (
        <div>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to log out?
          </Typography>
          <Button variant="contained" onClick={(user) => _logout(user)} sx={{ mt: 2, color: '#333', backgroundColor: '#F5F5F5', '&:hover': { backgroundColor: '#F5F5F5', color: '#888' } }}>
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h5" gutterBottom>
            Please login or register to have full access to your account and personal recipes.
          </Typography>
          <Typography variant="body1" gutterBottom>
          <Link to="/login">Login / Register </Link>
          </Typography>
        </div>
      )}
    </Box>
    </Box>
    </Box>
  );
};

export default Logout;




