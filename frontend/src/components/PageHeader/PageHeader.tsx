import "./PageHeader.scss";

/* eslint-disable camelcase */
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { UserContext, defaultUserContext } from "../../shared/interfaces";

const PageHeader = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const loggedIn = user.id !== 0;
  const firstName = user.first_name;
  const lastName = user.last_name;
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
    localStorage.clear();
    setUser(defaultUserContext);
    history.push("/login");
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
            <Typography>
              {firstName} {lastName}
            </Typography>
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

PageHeader.defaultProps = {
  currentUser: {},
};

export default PageHeader;
