import React from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import PageHeader from "./PageHeader";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <PageHeader />
      <LoginPage />
    </div>
  );
};

export default App;
