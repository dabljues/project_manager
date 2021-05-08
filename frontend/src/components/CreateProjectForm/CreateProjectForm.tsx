import "./CreateProjectForm.scss";

import React from "react";

import {
  Avatar,
  Button,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";

interface CreateProjectFormProps {
  setProjectName: (projectName: string) => void;
  projectNameErrors: string[];
  createProject: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CreateProjectForm = (props: CreateProjectFormProps) => {
  const { setProjectName, projectNameErrors } = props;
  const { createProject } = props;
  const errorsOccurred = projectNameErrors.length > 0;

  return (
    <Paper className="register-form" variant="elevation">
      <div className="sign-up-logo">
        <Avatar className="avatar">
          <PostAddIcon />
        </Avatar>
        <Typography variant="h6">Create a new project</Typography>
      </div>
      {errorsOccurred ? (
        <div className="form-errors">
          Project creation was unsuccessful:
          <ul>
            {projectNameErrors.map((error, index) => (
              <li className="form-error">{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <TextField
        className="textfield"
        label="Project name"
        name="projectname"
        size="small"
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setProjectName(event.target.value);
        }}
      />
      <Button
        className="signup-button"
        variant="contained"
        color="primary"
        onClick={(e) => createProject(e)}
      >
        Create
      </Button>
    </Paper>
  );
};

export default CreateProjectForm;
