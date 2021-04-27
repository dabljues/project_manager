import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "./useToken";
import "./PageHeader.scss";

const PageHeader = () => {
  const history = useHistory();
  const loggedIn = isAuthenticated();

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
          <div className="account-buttons">
            <AccountCircleIcon fontSize="large" />
          </div>
        ) : (
          <div className="account-buttons" />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
