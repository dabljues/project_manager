import CenteredDiv from "components/shared/CenteredDiv";
import styled from "styled-components/macro";

import { Avatar, Button, Paper, TextField } from "@material-ui/core";

const LoginForm = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-width: 400px;
  max-width: 500px;
  min-height: 500px;
  max-height: 600px;
  width: min-content;
`;

const SignInLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 80px;
`;

const StyledAvatar = styled(Avatar)`
  margin-bottom: 8px;
`;

const StyledTextField = styled(TextField)`
  margin: 10px !important;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
`;

const SubmitForm = styled.div`
  margin-top: 25px;
  width: 100%;
`;

const RegisterDiv = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const WrongCredentials = styled.div`
  background-color: rgb(255, 210, 218);
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 20px;
`;

export {
  LoginForm,
  RegisterDiv,
  SignInLogo,
  StyledAvatar,
  StyledButton,
  StyledTextField,
  SubmitForm,
  WrongCredentials,
};
