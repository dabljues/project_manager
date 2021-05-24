import "./App.scss";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";

import { getCurrentUser, isAuthenticated } from "../../api/auth";
import PrivateRoute from "../../components/PrivateRoute";
import UserData from "../../types/userData";
import LoginPage from "../Auth/LoginPage";
import RegisterPage from "../Auth/RegisterPage";
import HomePage from "../HomePage";
import PageHeader from "../PageHeader";
import Profile from "../Profile/Profile";
import CreateProject from "../Project/CreateProject";
import Projects from "../Project/Projects";
import Project from "../Project/Project";

const styles = makeStyles<Theme>((theme) =>
  createStyles({
    appBarSpacer: theme.mixins.toolbar,
  })
);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const classes = styles();

  useEffect(() => {
    const authenticated = isAuthenticated();
    const getUser = async () => {
      setCurrentUser(await getCurrentUser());
    };
    if (authenticated) {
      getUser();
    } else {
      setCurrentUser(null);
    }
  }, [loggedIn]);

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    setLoggedIn(false);
  };
  return (
    <Router>
      <PageHeader currentUser={currentUser} logOut={logOut} />
      <div className={classes.appBarSpacer} />
      <Switch>
        <Route
          exact
          path="/login"
          component={() => <LoginPage logIn={logIn} logOut={logOut} />}
        />
        <Route exact path="/register" component={RegisterPage} />
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/projects" component={Projects} />
        <PrivateRoute exact path="/project/create" component={CreateProject} />
        <PrivateRoute exact path="/project/:projectName" component={Project} />
      </Switch>
    </Router>
  );
};

export default App;
