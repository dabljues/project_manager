import "./PageHeader.scss";

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";

import UserData from "../../types/userData";

type PageHeaderProps = {
  currentUser: UserData | null;
  logOut: () => void;
};

const PageHeader = (props: PageHeaderProps) => {
  const { currentUser, logOut } = props;
  const loggedIn = currentUser !== null;
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logOut();
    localStorage.clear();
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
              {currentUser?.firstName} {currentUser?.lastName}
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar src={currentUser?.avatar} />
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
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  history.push("/profile");
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  history.push("/projects");
                }}
              >
                Projects
              </MenuItem>
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
