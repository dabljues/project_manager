import React from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
      </Switch>
    </Router>
  );
};

export default App;
