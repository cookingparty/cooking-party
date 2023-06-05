import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store";
import { Avatar } from "@mui/material";

export default function Dashboard() {
  const { auth } = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const profile = () => {
    setAnchorEl(null);
    navigate(`/users/${auth.id}`);
  };
  const updateUser = () => {
    handleClose();
    navigate("/update");
  };

  const logOut = () => {
    handleClose();
    navigate("/logout");
  };
  return (
    <div className="dashboard">
      <Avatar
      style={{
        marginRight: "20px", marginLeft: "10px"
      }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        alt="avatar"
        src={auth.avatar}
      ></Avatar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={profile}>Profile</MenuItem>
        <MenuItem onClick={updateUser}>Account</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
