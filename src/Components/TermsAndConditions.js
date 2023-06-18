import React from "react";
import Box from "@mui/material/Box";

const TermsAndConditions = () => {
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
          src="static/images/pizza.jpg"
          alt="pizza photo"
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
          <h1>Terms And Conditions</h1>
          <p>
            Welcome to Cooking Party! These Terms and Conditions govern your use
            of our website and services. By accessing or using Cooking Party,
            you agree to comply with these terms and conditions. Please read
            them carefully.
          </p>

          <h2>User Conduct:</h2>
          <p>
            You are solely responsible for any content you post or share on
            Cooking Party. You agree not to upload, post, or transmit any
            content that is unlawful, harmful, defamatory, obscene, or
            infringing upon intellectual property rights.
          </p>
          <p>
            You must be at least 18 years old to register and use our services.
            If you are under 18, you may use Cooking Party only with the
            involvement of a parent or guardian.
          </p>

          <h2>Intellectual Property:</h2>
          <p>
            All content and materials on Cooking Party, including recipes,
            articles, images, and trademarks, are the property of Cooking Party
            or its licensors. You may not copy, modify, distribute, or reproduce
            any part of our website without prior written consent.
          </p>
          <p>
            By posting or sharing content on Cooking Party, you grant us a
            non-exclusive, royalty-free, worldwide license to use, reproduce,
            modify, and distribute that content.
          </p>

          <h2>Disclaimer of Liability:</h2>
          <p>
            Cooking Party provides recipes and other content for informational
            purposes only. We do not make any warranties or guarantees regarding
            the accuracy, reliability, or completeness of the information
            provided.
          </p>
          <p>
            Cooking Party is not responsible for any damage or loss resulting
            from your use of our website or services. You agree to use Cooking
            Party at your own risk.
          </p>

          <p>
            These Terms and Conditions may be updated from time to time, and it
            is your responsibility to review them periodically. If you continue
            to use Cooking Party after any modifications, it indicates your
            acceptance of the revised terms. If you do not agree with these
            terms and conditions, please refrain from using Cooking Party.
          </p>
        </Box>
      </Box>
    </div>
  );
};

export default TermsAndConditions;
