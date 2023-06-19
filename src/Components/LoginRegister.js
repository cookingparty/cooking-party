import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchRecipes } from "../store";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { attemptLogin, updateAuth, logout, register } from "../store/auth";
import Carousel from "react-material-ui-carousel";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state);
  const { account } = useParams();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (recipes.length === 0) {
    return <p>Loading recipes...</p>;
  }

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
          <Carousel autoPlay={true} animation="slide" interval={6000}>
            {recipes.slice(0, 9).map((recipe, index) => (
              <img
                key={index}
                src={recipe.imageURL}
                alt={`Recipe ${index}`}
                style={{ width: "700px", height: "400px", objectFit: "cover" }}
              />
            ))}
          </Carousel>

          <p
            style={{
              textAlign: "center",
              marginTop: "0",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Featured Recipes
          </p>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          marginTop={10}
          p={2}
          // maxWidth={600}
          mx="auto"
          pt={4}
          bgcolor="#F5F5F5"
          sx={{ width: "700px" }}
        >
          <div sx={{ marginBottom: "100px" }}>
            <h2>{account === "login" ? "Login" : "Register"}</h2>
            <form
              sx={{
                backgroundColor: "almond",
                paddingBottom: "100px",
                margin: "60px",
                marginBottom: "200px",
                border: "40px solid almond",
                height: "400px",
                width: "700px",
              }}
              onSubmit={account === "login" ? login : _register}
            >
              <TextField
                label="Username"
                value={
                  credentials.username || credentials.facebook_username || ""
                }
                name="username"
                onChange={onChange}
              />
              <div style={{ marginBottom: "1rem" }} />
              <TextField
                id="filled-password-input"
                label="Password"
                name="password"
                type="password"
                value={credentials.password || ""}
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
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
