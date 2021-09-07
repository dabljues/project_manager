import { ProjectIcon } from "models";
import styled from "styled-components/macro";

import { Avatar, Button, Paper, TextField } from "@material-ui/core";

const CreateProjectForm = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-width: 400px;
  border: var(--paper-border);
`;

const CreateProjectIcon = styled(ProjectIcon)`
  font-size: 3rem;
`;

const CreateProjectLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 3.5rem;
  text-align: center;

  p {
    font-size: 1.5rem;
  }
`;

const FormButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
`;

const FormTextField = styled(TextField)`
  margin: 10px;
  width: 100%;
`;

const FormAvatar = styled(Avatar)`
  margin-bottom: 8px;
`;

export {
  CreateProjectForm,
  CreateProjectLogo,
  FormAvatar,
  FormButton,
  FormTextField,
  CreateProjectIcon,
};
