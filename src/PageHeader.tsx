import React from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";

type HeaderProps = {
  loggedIn: boolean;
};

const PageHeader = (props: HeaderProps) => {
  const loggedIn = props.loggedIn;

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className="menu-button"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="title">
          Project Manager
        </Typography>
        {!loggedIn ? (
          <React.Fragment>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Button color="inherit">Register</Button>
          </React.Fragment>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
