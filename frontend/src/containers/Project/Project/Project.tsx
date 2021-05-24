import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { authRequest } from "../../../api/auth";
import ProjectData from "../../../types/project";
import "./Project.scss";

interface ProjectParams {
  projectName: string;
}

interface ProjectProps extends RouteComponentProps<ProjectParams> {}

const Project = ({ match }: ProjectProps) => {
  const { projectName } = match.params;
  const [project, setProject] = useState<ProjectData | null>(null);

  const authCommunicator = authRequest();
  useEffect(() => {
    const getProject = async () => {
      const projectData = await authCommunicator
        .get(`/project/${projectName}`)
        .then((response) => response.data);
      setProject(projectData);
    };
    getProject();
    return () => {
      setProject(null);
    };
  }, []);

  return (
    <div>
      <p>Project name: {project?.name}</p>
      <p>Project status: {project?.status}</p>
      <p>Project description: {project?.description}</p>
      <p>
        Project owner: {project?.owner.firstName} {project?.owner.lastName}
      </p>
      <p>Created at: {project?.createdAt}</p>
    </div>
  );
};

export default withRouter(Project);
