import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import FacebookLogin from "@greatsumini/react-facebook-login";
// import CustomComponent from "@greatsumini/react-facebook-login";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { attemptLogin, updateAuth, logout } from "../store/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = async (ev) => {
    ev.preventDefault();
    await dispatch(attemptLogin(credentials));
    navigate("/home");
  };

  return (
    <div>
      <h2>Login</h2>

      <form style={{ margin: "10px 0" }}>
        <TextField
          label="Username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <div style={{ marginBottom: "1rem" }} />
        <TextField
          id="filled-password-input"
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={onChange}
        />
        <Button
          type="submit"
          onClick={login}
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: 2,
            color: "#333",
            backgroundColor: "#F9F6EE",
            "&:hover": { backgroundColor: "#F5F5F5", color: "#888" },
          }}
        >
          Login
        </Button>
      </form>

      <a
        href={`https://www.facebook.com/v17.0/dialog/oauth?client_id=${window.facebook_client_id}&redirect_uri=${window.facebook_redirect_uri}/api/auth/facebook`}
      >
        Login With Facebook
      </a>

      {/* <FacebookLogin
        appId="189486938370592"
        autoLoad={false}
        fields="name,email,picture"
        onClick={responseFacebook}
        callback={responseFacebook}
      /> */}
    </div>
  );
};

export default Login;
