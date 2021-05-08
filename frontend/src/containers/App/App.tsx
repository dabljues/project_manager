import "./App.scss";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { isAuthenticated } from "../../api/auth";
import PrivateRoute from "../../components/PrivateRoute";
import CreateProject from "../Project/CreateProject";
import HomePage from "../HomePage";
import LoginPage from "../Auth/LoginPage";
import PageHeader from "../PageHeader";
import Projects from "../Project/Projects";
import RegisterPage from "../Auth/RegisterPage";
import Profile from "../Profile/Profile";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    setLoggedIn(false);
  };
  return (
    <Router>
      <PageHeader loggedIn={loggedIn} logOut={logOut} />
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route
          exact
          path="/login"
          component={() => <LoginPage logIn={logIn} />}
        />
        <Route exact path="/register" component={RegisterPage} />
        <PrivateRoute exact path="/projects" component={Projects} />
        <PrivateRoute exact path="/projects/create" component={CreateProject} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;
