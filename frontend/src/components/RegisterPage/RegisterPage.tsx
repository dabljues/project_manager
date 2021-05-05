import "./RegisterPage.scss";

import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";

import PageHeader from "../PageHeader";

async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  try {
    await axios.post("/api/user/", {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
    return null;
  } catch (error) {
    return error.response.data;
  }
}

const signupDataValid = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  if (2 + 2 === 4) {
    return true;
  }
  return false;
};

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(
    ""
  );
  const history = useHistory();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // TODO: Handle errors, notify the user
    if (signupDataValid(firstName, lastName, email, password)) {
      const errors = await registerUser(firstName, lastName, email, password);
      if (!errors) {
        history.push("/login");
        return;
      }
      console.log(errors);
      if (errors.first_name) {
        setFirstNameError(errors.first_name);
      }
      if (errors.last_name) {
        setLastName(errors.last_name);
      }
      if (errors.email) {
        setEmailError(errors.email);
      }
      if (errors.password) {
        setPasswordError(errors.password);
      }
    }
  };

  return (
    <Paper className="register-form" variant="elevation">
      <div className="sign-up-logo">
        <Avatar className="avatar">
          <PersonIcon />
        </Avatar>
        <Typography variant="h6">Sign up to Project Manager</Typography>
      </div>
      <TextField
        className="textfield"
        label="First name"
        name="firstname"
        size="small"
        helperText={firstNameError}
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setFirstName(event.target.value);
        }}
      />
      <TextField
        className="textfield"
        label="Last name"
        name="lastname"
        size="small"
        helperText={lastNameError}
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setLastName(event.target.value);
        }}
      />
      <TextField
        className="textfield"
        label="Email"
        name="email"
        size="small"
        helperText={emailError}
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
        helperText={passwordError}
        variant="outlined"
        type="password"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setPassword(event.target.value);
        }}
      />
      <TextField
        className="textfield"
        label="Confirm password"
        name="confirm-password"
        size="small"
        helperText={passwordConfirmationError}
        variant="outlined"
        type="password"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setPasswordConfirmation(event.target.value);
        }}
      />
      <Button
        className="signup-button"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Sign up
      </Button>
    </Paper>
  );
};

const RegisterPage = () => (
  <div className="box">
    <PageHeader />
    <div className="page">
      <RegisterForm />
    </div>
    <div className="footer">
      <Typography>Copyright: dabljues</Typography>
    </div>
  </div>
);

export default RegisterPage;
