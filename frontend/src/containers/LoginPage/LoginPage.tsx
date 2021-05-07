import "./LoginPage.scss";

import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";

import {
  authRequest,
  isAuthenticated,
  setCurrentUser,
  setToken,
} from "../../api/auth";

interface LoginPageProps {
  logIn: () => void;
}
async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post("/api/token/", {
      email,
      password,
    });
    setToken(response.data);
    const authCommunicator = authRequest();
    const user = await authCommunicator.get("/user/current");
    setCurrentUser(user.data);
    return true;
  } catch (error) {
    return false;
  }
}

const WrongCredentials = () => (
  <div className="wrong-credentials">
    <Typography>
      The e-mail and password you&apos;ve entered do not match any entries in
      the database. Please try again
    </Typography>
  </div>
);

const LoginForm = (props: LoginPageProps) => {
  if (isAuthenticated()) {
    return <Redirect to={{ pathname: "/" }} />;
  }
  const { logIn } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsErrors, setCredentialsErrors] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const history = useHistory();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const success = await loginUser(email, password);
    if (success) {
      // TODO: Handle errors, notify the user
      logIn();
      history.push("/");
      return;
    }
    setCredentialsErrors(true);
  };

  return (
    <Paper className="login-form" variant="elevation">
      <div className="sign-in-logo">
        <Avatar className="avatar">
          <LockIcon />
        </Avatar>
        <Typography variant="h6">Sign in</Typography>
      </div>
      {credentialsErrors ? <WrongCredentials /> : null}
      <TextField
        className="textfield"
        label="Email"
        name="email"
        size="small"
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setEmail(event.target.value);
        }}
      />
      <TextField
        className="textfield"
        label="Password"
        name="password"
        size="small"
        variant="outlined"
        type="password"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setPassword(event.target.value);
        }}
      />
      <div className="submit-form">
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              color="primary"
              name="rememberMe"
            />
          }
          label="Remember me"
        />
        <Button
          className="button"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <div className="register">
          <Typography>
            Don&apos;t have an account?
            <Link to="/register" style={{ marginLeft: "15px" }}>
              Register here
            </Link>
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

const LoginPage = (props: LoginPageProps) => {
  const { logIn } = props;
  return (
    <div className="box">
      <div className="page">
        <LoginForm logIn={logIn} />
      </div>
      <div className="footer">
        <Typography>Copyright: dabljues</Typography>
      </div>
    </div>
  );
};

export default LoginPage;
