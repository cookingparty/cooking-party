import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAuth } from "../store";

const UpdateUser = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  const [account, setAccount] = useState({
    username: "",
    password: "",
    avatar: "",
    about: "",
  });

  useEffect(() => {
    ref.current.addEventListener("change", (ev) => {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => [
        setAccount((currentVal) => ({
          ...currentVal,
          avatar: reader.result,
        })),
      ]);
    });
  }, [ref]);

  useEffect(() => {
    if (auth) {
      setAccount({
        username: auth.username,
        password: auth.password,
        about: auth.about ? auth.about : "",
        avatar: auth.avatar ? auth.avatar : "",
      });
    }
  }, [auth]);

  const onChange = (ev) => {
    setAccount({ ...account, [ev.target.name]: ev.target.value });
  };

  const update = async (ev) => {
    ev.preventDefault();
    await dispatch(updateAuth(account));
    navigate(`/users/${auth.id}`);
  };

  return (
    <div
      style={{
        width: "80%",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form>
        <label>Username</label>
        <TextField
          placeholder="username"
          value={account.username || account.facebook_username || ""}
          name="username"
          onChange={onChange}
        />
        <label>Password</label>
        <TextField
          placeholder="password"
          value={account.password || ""}
          name="password"
          onChange={onChange}
          type="password"
        />
        <label>About</label>
        <TextField
          type="text"
          multiline
          value={account.about || ""}
          name="about"
          onChange={onChange}
        />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label>Avatar (PNG, JPEG, JPG only)</label>
          <input type="file" ref={ref} />
        </div>

        <Button variant="outlined" onClick={update}>
          {" "}
          update{" "}
        </Button>
      </form>
    </div>
  );
};

export default UpdateUser;
