import "./App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
import PrivateRoute from "../PrivateRoute";
import RegisterPage from "../RegisterPage";

const App = () => {
  const x = 1;
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </Router>
  );
};

export default App;
