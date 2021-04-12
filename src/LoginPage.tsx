import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/Lock";

import "./LoginPage.css";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    position: "absolute",
    left: "50%",
    top: "50%",
    translate: "translate(-50%, -50%)",
  },
  paper: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  icon: {
    margin: theme.spacing(1),
  },
  textfield: {
    margin: theme.spacing(1),
    width: "100%",
  },
  submit: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  grid: {},
}));

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  return (
    <Container className={classes.box} component="main" maxWidth="xs">
      <Paper className={classes.paper} variant="elevation">
        <Avatar>
          <LockIcon className={classes.icon} />
        </Avatar>
        <Typography variant="h6">Sign in</Typography>
        <TextField
          label="Email"
          name="email"
          size="small"
          variant="outlined"
          className={classes.textfield}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          label="Password"
          name="password"
          size="small"
          variant="outlined"
          type="password"
          className={classes.textfield}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setPassword(event.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            console.log(email, password);
          }}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
