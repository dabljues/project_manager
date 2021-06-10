import CenteredDiv from "components/shared/CenteredDiv";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { authRequest } from "../../../api/auth";
import CreateProjectForm from "../../../components/Project/CreateProjectForm";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectNameErrors, setProjectNameErrors] = useState<string[]>([]);
  const history = useHistory();

  const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectCreateResponse = await authRequest()
      .post("/project/", {
        name: projectName,
      })
      .then((response) => response)
      .catch((error) => {
        setProjectNameErrors(error.response.data.name);
      });
    if (projectCreateResponse && projectCreateResponse.status === 201) {
      history.push("/projects");
    }
  };

  return (
    <CenteredDiv>
      <CreateProjectForm
        setProjectName={setProjectName}
        projectNameErrors={projectNameErrors}
        createProject={handleCreate}
      />
    </CenteredDiv>
  );
};

export default CreateProject;
