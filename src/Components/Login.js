import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <input
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <button>Login</button>
      </form>
      <div
        className="fb-login-button"
        data-width=""
        data-size=""
        data-button-type=""
        data-layout=""
        data-auto-logout-link="true"
        data-use-continue-as="true"
      ></div>
    </div>
  );
};

export default Login;
