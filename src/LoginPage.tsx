import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockIcon from "@material-ui/icons/Lock";
import { Typography } from "@material-ui/core";
import PageHeader from "./PageHeader";

import "./LoginPage.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      <PageHeader loggedIn={false} />
      <Box className="center" maxWidth="xs">
        <Paper className="paper" variant="elevation">
          <Box className="sign-in-logo">
            <Avatar className="avatar">
              <LockIcon />
            </Avatar>
            <Typography variant="h6">Sign in</Typography>
          </Box>
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
          <Box className="submit-form">
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
              onClick={() => {
                console.log(email, password);
              }}
            >
              Sign in
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default LoginPage;
