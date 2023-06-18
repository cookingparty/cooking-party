import React from "react";
import Box from "@mui/material/Box";

const ContactUs = () => {
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
          src="static/images/pasta.jpg"
          alt="pasta photo"
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
          <h1>Contact Us</h1>
          <p>
            We would love to hear from you! If you have any questions, feedback,
            or inquiries, please don't hesitate to get in touch with us. Our
            dedicated team is here to assist you. Below, you'll find multiple
            ways to contact Cooking Party:
          </p>

          <h2>General Inquiries:</h2>
          <p>
            For general inquiries or information about Cooking Party, please
            send an email to info@cookingparty.com. We strive to respond to all
            inquiries within 24 hours.
          </p>

          <h2>Technical Support:</h2>
          <p>
            If you are experiencing any technical issues while using Cooking
            Party or need assistance with your account, please reach out to our
            technical support team at support@cookingparty.com. Be sure to
            provide detailed information about the problem you're facing so that
            we can assist you effectively.
          </p>

          <h2>Media and Press Inquiries:</h2>
          <p>
            For media inquiries, partnership opportunities, or press-related
            matters, please contact our PR team at press@cookingparty.com. We
            are excited to collaborate with journalists, bloggers, and
            influencers who share our passion for cooking and food.
          </p>

          <h2>Advertising and Sponsorship:</h2>
          <p>
            If you are interested in advertising on Cooking Party or exploring
            sponsorship opportunities, please email us at ads@cookingparty.com.
            Let us know your advertising goals or sponsorship ideas, and we'll
            be happy to discuss potential collaborations.
          </p>

          <h2>Social Media:</h2>
          <p>
            Connect with us on social media platforms to stay updated with the
            latest news, recipes, and community highlights. You can find us on
            Facebook and Instagram by searching for @CookingParty. Feel free to
            send us direct messages or tag us in your culinary adventures!
          </p>

          <p>
            Please note that the above contact information is fictitious and
            provided for demonstration purposes only. Any resemblance to actual
            contact details is purely coincidental. We look forward to hearing
            from you and assisting you on your cooking journey!
          </p>

          <p>Happy Cooking,</p>
          <p>The Cooking Party Team</p>
        </Box>
      </Box>
    </div>
  );
};

export default ContactUs;
