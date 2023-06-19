import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchRecipes } from "../store";
import TrendingMeals from "./TrendingMeals";
import TrendingCocktails from "./TrendingCocktails";
import Instafeed from "instafeed.js";
import Box from "@mui/material/Box";
import { accessTokenIg } from "../../secrets";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";

const InstagramCarousel = () => {
  const [instaFeed, setInstaFeed] = useState([]);

  useEffect(() => {
    const userFeed = new Instafeed({
      get: "user",
      resolution: "low_resolution",
      limit: 4,
      accessToken: accessTokenIg,
      target: "instafeed-container",
      after: (images) => {
        setInstaFeed(images.map((image) => image.image));
      },
    });
    userFeed.run();
  }, []);

  return (
    <div
      id="instafeed-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "50px",
        maxWidth: "100%", // Add this line
        overflow: "hidden", // Add this line
      }}
    >
      {instaFeed.map((image, index) => (
        <a key={index} style={{ margin: "10px" }}>
        <img
          key={index}
          src={image}
          alt={`Instagram ${index}`}
        />
      </a>
      ))}
    </div>
  );
};


const Home = () => {
  const { recipes } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (recipes.length === 0) {
    return <p>Loading recipes...</p>;
  }

  

  const carouselWidth = '85%'; // Width for both carousels
  const carouselBackground = '#d7dbd8'; // Background color for carousels

  return (
    <div style={{ margin: '50px', textAlign: 'center' }}>
      <div>
        {/* ...existing code... */}
        <div>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginBottom={2}
          >
            <Box
              sx={{
                backgroundColor: carouselBackground,
                margin: '60px',
                marginBottom: '80px',
                height: '600px',
                width: carouselWidth,
                maxWidth: "100%", // Add this line
                overflow: "hidden", // Add this line
              }}
            >
              <Carousel autoPlay={true} animation="slide" interval={6000}>
                {recipes.slice(0, 9).map((recipe, index) => (
                  <img
                    key={index}
                    src={recipe.imageURL}
                    alt={`Recipe ${index}`}
                    style={{
                      width: '100%',
                      height: '600px',
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </Carousel>
            </Box>
            <Box
              sx={{
                backgroundColor: carouselBackground,
                margin: '50px',
                marginTop: '50px',
                padding: '30px',
                width: carouselWidth,
              }}
            >
              <InstagramCarousel 
              sx={{height: '600px', width: '1100px'}}
              />
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#ed4218',
                }}
              >
                Our Latest Recipes On Instagram
              </p>
            </Box>
            <Box
              sx={{
                width: carouselWidth,
                margin: '30px',
                backgroundColor: carouselBackground,
                padding: '30px',
              }}
            >
              <Box
              sx={{marginBottom: "30px"}}
              >
              <TrendingMeals />
              </Box>

              <Box
              sx={{marginBottom: "30px"}}
              >
              <TrendingCocktails />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Home;
