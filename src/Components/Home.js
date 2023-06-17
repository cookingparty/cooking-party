import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TrendingMeals from './TrendingMeals';
import TrendingCocktails from './TrendingCocktails';
import Instafeed from 'instafeed.js';
import Box from '@mui/material/Box';
import { accessTokenIg } from '../../secrets';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const photos = [
  {
    imageUrl: 'placeholder-link-1',
    description: 'Photo 1 Description',
  },
  {
    imageUrl: 'placeholder-link-2',
    description: 'Photo 2 Description',
  },
  {
    imageUrl: 'placeholder-link-3',
    description: 'Photo 3 Description',
  },
  {
    imageUrl: 'placeholder-link-4',
    description: 'Photo 4 Description',
  },
];






const InstagramCarousel = () => {
  const [instaFeed, setInstaFeed] = useState([]);

  useEffect(() => {
    const userFeed = new Instafeed({
      get: 'user',
      resolution: 'medium_resolution',
      limit: 2,
      accessToken: accessTokenIg,
      target: 'instafeed-container',
      after: (images) => {
        setInstaFeed(images.map((image) => image.image));
      },
    });
    userFeed.run();
  }, []);

  return (
    
    <div id="instafeed-container">
      {instaFeed.map((image, index) => (
        <img key={index} src={image} alt={`Instagram ${index}`} style={{ display: 'none' }} />
      ))}
    </div>
  );
};

const Home = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div style={{ margin: '50px', textAlign: 'center' }}>
      <div>
        {auth.id ? (
          <p>{''}</p>
        ) : (
          <Button
            component={Link}
            to="/auth/login"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 3,
              color: '#333',
              backgroundColor: '#F9F6EE',
              '&:hover': {
                backgroundColor: '#F5F5F5',
                color: '#888',
              },
            }}
          >
            Login Here
          </Button>
        )}
        <div>
          <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
           
          <Box
      sx={{
        backgroundColor: 'almond',
        margin: '40px',
        height: 'calc(50% * 9 / 16)',
        width: '50%',
        border: '40px solid almond',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '10px',
          margin: '0 auto',
        }}
      >
        
        <Carousel showArrows={false} showThumbs={false} showStatus={false} centerMode={true} centerSlidePercentage={100}>
          {photos.map((photo, index) => (
            <Box key={index}>
              <img
                src={photo.imageUrl}
                alt={`Photo ${index + 1}`}
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
              <p sx={{ textAlign: 'center' }}>{photo.description}</p>
            </Box>
          ))}
        </Carousel>
      </Box>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '10px',
          marginTop: '10px',
        }}
      >
        <h3 sx={{ textAlign: 'center' }}>Current Featured Recipe</h3>
        <p sx={{ textAlign: 'center' }}>
          Placeholder text about the most current featured recipe. This is a brief description that should be under 100
          words.
        </p>
      </Box>
    </Box>
           
            <p>Our Latest Recipes on Instagram</p>
            <InstagramCarousel />
          </Box>
          <h2>Trending Meal Recipes</h2>
          <TrendingMeals />

          <h2>Trending Cocktail Recipes</h2>
          <TrendingCocktails />
        </div>
      </div>
    </div>
  );
};

export default Home;






// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import TrendingMeals from './TrendingMeals';
// import TrendingCocktails from './TrendingCocktails';
// import Instafeed from 'instafeed.js';

// const InstagramCarousel = () => {
//   const [instaFeed, setInstaFeed] = useState([]);

//   useEffect(() => {
//     const userFeed = new Instafeed({
//       get: 'user',
//       resolution: 'medium_resolution',
//       limit: 6,
//       accessToken: 'IGQVJWOFR4VzVuSGtQZAjNQQUpCRU12dEp0anNHU1dFbTE3QkxVM0tzSS1fRGVSU0swZA1RJQWVQWmszYTZAibVEtdmdwNFJQRnQtTk50Q1VaQ0s4N19UaUs4ZATlGUDUzQmpJTnRrOGttMXRLOXNqdzg4bQZDZD',
//       target: 'instafeed-container',
//       after: (images) => {
//         setInstaFeed(images.map((image) => image.image));
//       },
//     });
//     userFeed.run();
//   }, []);

//   return (
//     <div id="instafeed-container">
//       {instaFeed.map((image, index) => (
//         <img key={index} src={image} alt={`Instagram ${index}`} style={{ display: 'none' }} />
//       ))}
//     </div>
//   );
// };

// const Home = () => {
//   const { auth } = useSelector((state) => state);

//   return (
//     <div>
//       <h1>Home</h1>
//       {auth.id ? (
//         <p>Welcome {auth.username || auth.facebook_username}!</p>
//       ) : (
//         <Button
//           component={Link}
//           to="/auth/login"
//           variant="contained"
//           color="primary"
//           size="large"
//           sx={{
//             mt: 3,
//             color: '#333',
//             backgroundColor: '#F9F6EE',
//             '&:hover': {
//               backgroundColor: '#F5F5F5',
//               color: '#888',
//             },
//           }}
//         >
//           Login Here
//         </Button>
//       )}
//       <div>
//         <InstagramCarousel />
//         <h2>Trending Meal Recipes</h2>
//         <TrendingMeals />

//         <h2>Trending Cocktail Recipes</h2>
//         <TrendingCocktails />
//       </div>
//     </div>
//   );
// };

// export default Home;
