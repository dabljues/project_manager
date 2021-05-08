import "./CreateProject.scss";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { authRequest } from "../../api/auth";
import CreateProjectForm from "../../components/CreateProjectForm";

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
    <CreateProjectForm
      setProjectName={setProjectName}
      projectNameErrors={projectNameErrors}
      createProject={handleCreate}
    />
  );
};

export default CreateProject;
