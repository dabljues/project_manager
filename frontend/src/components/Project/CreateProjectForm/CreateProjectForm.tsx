import FormErrors from "components/shared/FormErrors";
import React from "react";

import * as S from "./CreateProjectForm.styles";

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
    <S.CreateProjectForm>
      <S.CreateProjectLogo>
        <S.CreateProjectIcon />
        <p>Create a new project</p>
      </S.CreateProjectLogo>
      {errorsOccurred ? (
        <FormErrors>
          Project creation was unsuccessful:
          <ul>
            {projectNameErrors.map((error, index) => (
              <li key="{error}">{error}</li>
            ))}
          </ul>
        </FormErrors>
      ) : null}
      <S.FormTextField
        label="Project name"
        size="small"
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setProjectName(event.target.value);
        }}
      />
      <S.FormButton
        variant="contained"
        color="primary"
        onClick={(e) => createProject(e)}
      >
        Create
      </S.FormButton>
    </S.CreateProjectForm>
  );
};

export default CreateProjectForm;
