import "./App.scss";

import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  UserData,
  UserContext,
  defaultUserContext,
} from "../../shared/interfaces";
import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
import PrivateRoute from "../PrivateRoute";
import RegisterPage from "../RegisterPage";

const App = () => {
  const [user, setUser] = useState<UserData>(defaultUserContext.user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
