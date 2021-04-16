import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { Link, useHistory } from "react-router-dom";

import "./PageHeader.scss";

type HeaderProps = {
  loggedIn: boolean;
};

const PageHeader = (props: HeaderProps) => {
  const history = useHistory();
  const { loggedIn } = props;

  return (
    <AppBar>
      <Toolbar>
        <Grid container>
          <Grid container item xs={4}>
            <Link to="/" className="grow" style={{ textDecoration: "none" }}>
              <Avatar>PM</Avatar>
            </Link>
          </Grid>
          <Grid container item className="title" xs={4}>
            <Typography variant="h5">Project Manager</Typography>
          </Grid>
          <Grid container item className="account-buttons" xs={4}>
            {!loggedIn ? (
              <>
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
              </>
            ) : null}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
