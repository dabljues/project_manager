import Breakpoints from "models";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import {
  createMuiTheme,
  MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core/styles";

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
import Task from "../Task/Task";
import PageContent from "./App.styles";

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xxs: true;
    xxl: true;
    twoK: true;
    forK: true;
  }
}

const theme = createMuiTheme({
  breakpoints: {
    values: Breakpoints,
  },
});

const App = () => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
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
    <StylesProvider injectFirst>
      {/* MUI THEME PROVIDER */}
      <MuiThemeProvider theme={theme}>
        {/* SC THEME PROVIDER */}
        <ThemeProvider theme={theme}>
          <Router>
            <PageHeader currentUser={currentUser} logOut={logOut} />
            <PageContent>
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
                <PrivateRoute exact path="/task/:taskName" component={Task} />
              </Switch>
            </PageContent>
          </Router>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default App;
