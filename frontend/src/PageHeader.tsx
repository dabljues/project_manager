import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import { isAuthenticated } from "./useToken";
import "./PageHeader.scss";

const PageHeader = () => {
  const history = useHistory();
  const loggedIn = isAuthenticated();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    history.push("/login");
    localStorage.clear();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <div className="site-logo">
          <IconButton onClick={() => history.push("/")}>
            <Avatar>PM</Avatar>
          </IconButton>
        </div>
        <Typography noWrap variant="h5" className="title">
          Project Manager
        </Typography>
        {loggedIn ? (
          <div className="account-section">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="account-section" />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
