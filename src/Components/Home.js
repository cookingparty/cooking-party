import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchRecipes } from '../store';

import Button from '@mui/material/Button';
import TrendingMeals from './TrendingMeals';
import TrendingCocktails from './TrendingCocktails';
import Instafeed from 'instafeed.js';
import Box from '@mui/material/Box';
import { accessTokenIg } from '../../secrets';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Carousel from 'react-material-ui-carousel'
import {useParams} from "react-router-dom"
import { Paper,} from '@mui/material'


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
  const { recipes} = useSelector(state => state);
  const dispatch = useDispatch()
  const { id } = useParams();
  
  
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
    border: '40px solid almond',
    height: '400px', 
    width: '700px', 
  }}
>
<Carousel autoPlay={true} animation="slide" interval={5000}>
    {recipes.map((recipe, index) => {
      console.log(`Recipe ${index} Image URL:`, recipe.imageURL); // Add the console.log statement here
      return   <img
      key={index}
      src={recipe.imageURL}
      alt={`Recipe ${index}`}
      style={{ width: '700px', height: '400px', objectFit: 'cover' }}
    />
    })}
  </Carousel>
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




