import React from "react";
import Box from "@mui/material/Box";

const About = () => {
  const carouselWidth = "85%";
  const carouselBackground = "#d7dbd8";

  return (
    <div style={{ margin: "50px", textAlign: "center" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom={2}
      >
        <img
          src="static/images/salmon.jpg"
          alt="salmon photo"
          style={{
            top: 0,
            left: 0,
            width: carouselWidth,
            height: "auto",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            backgroundColor: carouselBackground,
            margin: "60px",
            marginBottom: "80px",
            padding: "10px",
            height: "auto",
            width: carouselWidth,
          }}
        >
          <h1>About Us</h1>
          <p>
            Cooking Party was founded in 2023 by Rebecca Cherry, Angel Gao,
            Sarah Goewey, and Nicholas Race. With a shared passion for food and
            the joy of bringing people together, our team embarked on a mission
            to create a vibrant online community dedicated to the art of cooking
            and hosting unforgettable culinary experiences.
          </p>
          <p>
            At Cooking Party, we believe that cooking is not just about
            preparing meals; it's a celebration of culture, creativity, and
            connections. We understand the power of food in forging lasting
            memories and deepening relationships. That's why we've built a
            platform where food enthusiasts, home cooks, and aspiring chefs can
            come together to explore recipes, share their own culinary triumphs,
            and connect with like-minded individuals from around the world.
          </p>
          <p>
            Our website serves as a virtual kitchen, offering a diverse range of
            recipes and interactive features designed to inspire and empower our
            community. Whether you're a seasoned chef looking to refine your
            skills or a novice cook eager to embark on a culinary adventure,
            Cooking Party gets you connected so that you can create delicious
            meals and host remarkable gatherings. Join us on this exciting
            gastronomic journey, where the love for food and the joy of
            connection are at the heart of everything we do.
          </p>
        </Box>
      </Box>
    </div>
  );
};

export default About;
