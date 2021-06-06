import "./App.scss";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  createMuiTheme,
  createStyles,
  makeStyles,
  MuiThemeProvider,
  Theme,
} from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";

import { getCurrentUser, isAuthenticated } from "../../api/auth";
import PrivateRoute from "../../components/PrivateRoute";
import UserData from "../../types/userData";
import LoginPage from "../Auth/LoginPage";
import RegisterPage from "../Auth/RegisterPage";
import HomePage from "../HomePage";
import PageHeader from "../PageHeader";
import Profile from "../Profile/Profile";
import Backlog from "../Project/Backlog";
import CreateProject from "../Project/CreateProject";
import Project from "../Project/Project";
import Projects from "../Project/Projects";

const THEME = createMuiTheme({
  typography: {
    fontFamily: `Arial, sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const styles = makeStyles<Theme>((theme) =>
  createStyles({
    appBarSpacer: theme.mixins.toolbar,
  })
);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const classes = styles();
  useEffect(() => {
    if (!loggedIn) {
      setCurrentUser(null);
      return;
    }
    const getUser = async () => {
      setCurrentUser(await getCurrentUser());
    };
    getUser();
  }, [loggedIn]);

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    setLoggedIn(false);
  };
  return (
    <MuiThemeProvider theme={THEME}>
      <Router>
        <PageHeader currentUser={currentUser} logOut={logOut} />
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route
            exact
            path="/login"
            component={() => <LoginPage logIn={logIn} />}
          />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/projects" component={Projects} />
          <PrivateRoute
            exact
            path="/project/create"
            component={CreateProject}
          />
          <PrivateRoute
            exact
            path="/project/:projectName"
            component={Project}
          />
          <PrivateRoute
            exact
            path="/project/:projectName/backlog"
            component={Backlog}
          />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
