import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import HomePage from "../HomePage";
import PrivateRoute from "../PrivateRoute";

const App = () => (
  <Router>
    <Switch>
      <PrivateRoute exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  </Router>
);

export default App;
