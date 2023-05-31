import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function FooterNav() {
  const { auth } = useSelector((state) => state);

  const pages = ['About', 'Terms & Conditions', 'FAQ', 'Contact Us'];

  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        background: '#F9F6EE',
        justifyContent: 'space-between',
        py: 2,
        fontFamily: 'helvetica',
        zIndex: 10,
        marginTop: '30px',
        padding: '10px 20px', 
        margin: '20px auto', 
        boxSizing: 'border-box', // Ensure padding and border are included in width calculation
      }}
    >
      <Typography
        variant="subtitle2"
        component={Link}
        to="/about"
        sx={{
          fontSize: 10, 
          ml: 2,
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: '#0C090A',
        }}
      >
        About
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {pages.slice(1).map((page) => (
          <Typography
            key={page}
            variant="subtitle2"
            component={Link}
            to={`/${page.toLowerCase().replace(' ', '-')}`}
            sx={{
              fontSize: 10, 
              ml: 2,
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: '#0C090A',
            }}
          >
            {page}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
