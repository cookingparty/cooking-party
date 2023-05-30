import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store";

export default function Dashboard() {
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

  const updateUser = () => {
    handleClose();
    navigate("/update");
  };

  const logOut = () => {
    handleClose();
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="dashboard">
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={updateUser}>Edit account</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
