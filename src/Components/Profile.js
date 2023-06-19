import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const authId = useParams();

  return (
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
  );
};

export default Profile;
