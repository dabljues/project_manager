import React from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";

import "./PageHeader.scss";

type HeaderProps = {
  loggedIn: boolean;
};

const PageHeader = (props: HeaderProps) => {
  const history = useHistory();
  const loggedIn = props.loggedIn;

  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          className="grow"
          //   onClick={() => history.push("/")}
        >
          {/* Project Manager */}
          <Link to="/">Project Manager</Link>
        </Typography>
        {!loggedIn ? (
          <React.Fragment>
            <Button
              className="header-button"
              variant="outlined"
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
            <Button
              className="header-button"
              variant="outlined"
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          </React.Fragment>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
