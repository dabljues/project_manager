import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockIcon from "@material-ui/icons/Lock";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import PageHeader from "./PageHeader";
import { setToken } from "./useToken";

import "./LoginPage.scss";

type Credentials = {
  email: string;
  password: string;
};

async function loginUser(credentials: Credentials) {
  return { token: "ABC" };
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
  };

  return (
    <Paper className="paper" variant="elevation">
      <div className="sign-in-logo">
        <Avatar className="avatar">
          <LockIcon />
        </Avatar>
        <Typography variant="h6">Sign in</Typography>
      </div>
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
            Dont have an account?
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
    <PageHeader loggedIn={false} />
    <div className="page">
      <LoginForm />
    </div>
    <div className="footer">
      <Typography>Copyright: dabljues</Typography>
    </div>
  </div>
);

export default LoginPage;
