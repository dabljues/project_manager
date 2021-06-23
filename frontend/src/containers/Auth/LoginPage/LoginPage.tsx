import axios from "axios";
import CenteredDiv from "components/shared/CenteredDiv";
import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";

import { isAuthenticated, setToken } from "../../../api/auth";
import * as S from "./LoginPage.styles";

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
    return true;
  } catch (error) {
    return false;
  }
}

const WrongCredentials = () => (
  <S.WrongCredentials>
    <Typography>
      The e-mail and password you&apos;ve entered do not match any entries in
      the database. Please try again
    </Typography>
  </S.WrongCredentials>
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
    <S.LoginForm>
      <S.SignInLogo>
        <S.StyledAvatar>
          <LockIcon />
        </S.StyledAvatar>
        <Typography variant="h6">Sign in</Typography>
      </S.SignInLogo>
      {credentialsErrors ? <WrongCredentials /> : null}
      <S.StyledTextField
        label="Email"
        name="email"
        size="small"
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setEmail(event.target.value);
        }}
      />
      <S.StyledTextField
        label="Password"
        name="password"
        size="small"
        variant="outlined"
        type="password"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setPassword(event.target.value);
        }}
      />
      <S.SubmitForm>
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
        <S.StyledButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Sign in
        </S.StyledButton>
        <S.RegisterDiv>
          <Typography>
            Don&apos;t have an account?
            <Link to="/register" style={{ marginLeft: "15px" }}>
              Register here
            </Link>
          </Typography>
        </S.RegisterDiv>
      </S.SubmitForm>
    </S.LoginForm>
  );
};

const LoginPage = (props: LoginPageProps) => {
  const { logIn } = props;
  return (
    <CenteredDiv>
      <LoginForm logIn={logIn} />
    </CenteredDiv>
  );
};

export default LoginPage;
