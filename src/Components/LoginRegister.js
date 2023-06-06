import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import FacebookLogin from "@greatsumini/react-facebook-login";
// import CustomComponent from "@greatsumini/react-facebook-login";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { attemptLogin, updateAuth, logout, register } from "../store/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { account } = useParams();

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

  const handleLogin = () => {
    const redirectUri = `${window.facebook_redirect_uri}/api/auth/facebook`;
    const facebookAuthUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${
      window.facebook_client_id
    }&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = facebookAuthUrl;
  };

  const _register = (ev) => {
    ev.preventDefault();
    dispatch(register(credentials));
    navigate("/home");
  };

  return (
    <div>
      <h2>{account === "login" ? "Login" : "Register"}</h2>
      <form
        style={{ margin: "10px 0" }}
        onSubmit={account === "login" ? login : _register}
      >
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
          {account === "login" ? "Login" : "Register"}{" "}
        </Button>
      </form>
      {account === "login" ? (
        <Button
          type="submit"
          onClick={handleLogin}
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
          Login with Facebook
        </Button>
      ) : null}
      {account === "login" ? (
        <p>
          No account? <br />
          <Button
            component={Link}
            to="/auth/register"
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
            Sign up here
          </Button>
        </p>
      ) : null}
    </div>
  );
};

export default Login;
