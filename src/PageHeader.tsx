import React from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";

import "./PageHeader.scss";

type HeaderProps = {
  loggedIn: boolean;
};

const PageHeader = (props: HeaderProps) => {
  const loggedIn = props.loggedIn;

  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="grow">
          {/* <Link href="/" color="primary"> */}
          Project Manager
          {/* </Link> */}
        </Typography>
        {!loggedIn ? (
          <React.Fragment>
            <Link href="/login">
              <Button className="header-button">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="header-button">Register</Button>
            </Link>
          </React.Fragment>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
