import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const authId = useParams();
  const carouselWidth = "50%";
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
        marginBottom={2}
      >
        <img
          src="static/images/saladprofile.jpg"
          alt="fruit cocktails"
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
          backgroundColor: "almond",
          margin: "60px",
          marginBottom: "80px",
          border: "40px solid almond",
          height: "400px",
          width: "700px",
        }}
      >
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{font: 'Helvetica', textAlign: "center"}}
        >Profile</h1>
      <div>
        {" "}
        {auth.avatar ? (
          <img
            style={{
              maxWidth: "200px",
            }}
            src={auth.avatar}
          />
        ) : (
          "no avatar yet!"
        )}
      </div>
      <h2>{auth.username || auth.facebook_username}</h2>
      <p>{auth.about}</p>
    </div>
    </Box>
    </Box>
    </Box>
  );
};

export default Profile;
