import React from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import PageHeader from "./PageHeader";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
