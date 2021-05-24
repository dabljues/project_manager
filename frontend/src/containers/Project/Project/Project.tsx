import { RouteComponentProps, withRouter } from "react-router-dom";
import "./Project.scss";

interface ProjectParams {
  projectName: string;
}

interface ProjectProps extends RouteComponentProps<ProjectParams> {}

const Project = ({ match }: ProjectProps) => {
  const { params } = match;
  const { projectName } = params;

  return <div>Project name: {projectName}</div>;
};

export default withRouter(Project);
