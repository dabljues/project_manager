import "./LoginPage.scss";

import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";

import { decodeJWT } from "../../hooks/useToken";
import PageHeader from "../PageHeader";

async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post("/api/token/", {
      email,
      password,
    });
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    const decodedToken = decodeJWT(response.data.access);
    localStorage.setItem("user_id", decodedToken?.user_id);
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

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsErrors, setCredentialsErrors] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const success = await loginUser(email, password);
    // TODO: Handle errors, notify the user
    if (success) {
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

const LoginPage = () => (
  <div className="box">
    <PageHeader />
    <div className="page">
      <LoginForm />
    </div>
    <div className="footer">
      <Typography>Copyright: dabljues</Typography>
    </div>
  </div>
);

export default LoginPage;
