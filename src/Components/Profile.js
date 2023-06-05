import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const authId = useParams();

  return (
    <>
      <div> {auth.avatar ? <img src={auth.avatar} /> : "no avatar yet!"}</div>
      <h2>{auth.username}</h2>
      <p>{auth.about}</p>
    </>
  );
};

export default Profile;
