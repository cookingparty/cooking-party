import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const authId = useParams();

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
      marginBottom="120px"
    >
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
