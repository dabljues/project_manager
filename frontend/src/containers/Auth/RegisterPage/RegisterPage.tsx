// import "./RegisterPage.scss";

import axios from "axios";
import CenteredDiv from "components/shared/CenteredDiv";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";

import * as S from "./RegisterPage.styles";

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
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");
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
    <S.RegisterForm>
      <S.SignUpLogo>
        <S.StyledAvatar>
          <PersonIcon />
        </S.StyledAvatar>
        <Typography variant="h6">Sign up to Project Manager</Typography>
      </S.SignUpLogo>
      <S.FormTextField
        label="First name"
        name="firstname"
        size="small"
        helperText={firstNameError}
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setFirstName(event.target.value);
        }}
      />
      <S.FormTextField
        label="Last name"
        name="lastname"
        size="small"
        helperText={lastNameError}
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setLastName(event.target.value);
        }}
      />
      <S.FormTextField
        label="Email"
        name="email"
        size="small"
        helperText={emailError}
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setEmail(event.target.value);
        }}
      />
      <S.FormTextField
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
      <S.FormTextField
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
      <S.SignUpButton
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Sign up
      </S.SignUpButton>
    </S.RegisterForm>
  );
};

const RegisterPage = () => (
  <CenteredDiv>
    <RegisterForm />
  </CenteredDiv>
);

export default RegisterPage;
