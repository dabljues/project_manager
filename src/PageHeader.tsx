import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";

import "./PageHeader.scss";

type HeaderProps = {
  loggedIn: boolean;
};

const PageHeader = (props: HeaderProps) => {
  const history = useHistory();
  const { loggedIn } = props;

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
        {!loggedIn ? (
          <div className="account-buttons">
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
          </div>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
