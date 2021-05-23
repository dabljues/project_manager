import "./App.scss";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { getCurrentUser, isAuthenticated } from "../../api/auth";
import PrivateRoute from "../../components/PrivateRoute";
import CreateProject from "../Project/CreateProject";
import HomePage from "../HomePage";
import LoginPage from "../Auth/LoginPage";
import PageHeader from "../PageHeader";
import Projects from "../Project/Projects";
import RegisterPage from "../Auth/RegisterPage";
import Profile from "../Profile/Profile";
import UserData from "../../types/userData";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

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
        <PrivateRoute exact path="/projects/create" component={CreateProject} />
      </Switch>
    </Router>
  );
};

export default App;
