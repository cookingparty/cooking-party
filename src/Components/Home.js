import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchRecipes } from '../store';
import TrendingMeals from './TrendingMeals';
import TrendingCocktails from './TrendingCocktails';
import Instafeed from 'instafeed.js';
import Box from '@mui/material/Box';
import { accessTokenIg } from '../../secrets';
import Carousel from 'react-material-ui-carousel'
import {useParams} from "react-router-dom"



const InstagramCarousel = () => {
  const [instaFeed, setInstaFeed] = useState([]);

  useEffect(() => {
    const userFeed = new Instafeed({
      get: 'user',
      resolution: 'medium_resolution',
      limit: 4,
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
      <a
        key={index}
        style={{ margin: '10px' }}
      >
        <img
          key={index}
          src={image}
          alt={`Instagram ${index}`}
          style={{ display: 'none', margin: '10px' }}
        />
      </a>
    ))}
  </div>
  
  );
};

const Home = () => {
  const { recipes} = useSelector(state => state);
  const dispatch = useDispatch()

  
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
 
  useEffect(() => {
  dispatch(fetchRecipes());
    }
, [dispatch]);

if (recipes.length === 0) {
  return <p>Loading recipes...</p>;
}

return (
  <div style={{ margin: '50px', textAlign: 'center' }}>
    <div>
      {/* {auth.id ? (
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
      )} */}
      <div>
        <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
        <Box
  sx={{
    backgroundColor: 'almond',
    margin: '60px',
    marginBottom: "80px",
    border: '40px solid almond',
    height: '400px', 
    width: '700px', 
  }}
>
<Carousel autoPlay={true} animation="slide" interval={6000}>
  {recipes.slice(0, 9).map((recipe, index) => (
    <img
      key={index}
      src={recipe.imageURL}
      alt={`Recipe ${index}`}
      style={{ width: '700px', height: '400px', objectFit: 'cover' }}
    />
  ))}
</Carousel>

<p
    style={{
      textAlign: 'center',
      marginTop: '0',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }}
  
>Featured Recipes</p>
          </Box>
         <Box>
          <InstagramCarousel />
          <p
    style={{
      textAlign: 'center',
      marginTop: '0',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }}
  
>Our Latest Recipes On Instagram</p>
          </Box>
        </Box>
        <p
    style={{
      textAlign: 'center',
      marginTop: '0',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }}
  
>Trending Meal Recipes</p>
        <TrendingMeals />

        <p
    style={{
      textAlign: 'center',
      marginTop: '0',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }}
  
>Trending Meal Recipes</p>
        <TrendingCocktails />
      </div>
    </div>
  </div>
);
};


export default Home;




