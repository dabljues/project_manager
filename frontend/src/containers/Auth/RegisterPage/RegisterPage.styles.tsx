import { Avatar, Button, Paper, TextField } from "@material-ui/core";
import styled from "styled-components/macro";

const RegisterForm = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-width: 400px;
  max-width: 500px;
  min-height: 500px;
  max-height: 600px;
`;

const SignUpLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 50px;
`;

const SignUpButton = styled(Button)`
  margin-top: 20px !important;
  width: 100%;
`;

const FormTextField = styled(TextField)`
  margin: 10px !important;
  width: 100%;
`;

const StyledAvatar = styled(Avatar)`
  margin-bottom: 8px;
`;

export { FormTextField, RegisterForm, SignUpButton, SignUpLogo, StyledAvatar };
