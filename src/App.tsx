import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import useToken from "./useToken";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const { token, setToken } = useToken();

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route
          exact
          path="/login"
          component={() => <LoginPage setToken={setToken} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
