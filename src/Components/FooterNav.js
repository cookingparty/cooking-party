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
        display: 'flex',
        background: '#F9F6EE',
        justifyContent: 'center',
        py: 2,
        fontFamily: 'helvetica',
        zIndex: 10,
        marginTop: '30px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {pages.map((page) => (
          <Typography
            key={page}
            variant="subtitle2"
            component={Link}
            to={`/${page.toLowerCase()}`}
            sx={{
              fontSize: 12,
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
