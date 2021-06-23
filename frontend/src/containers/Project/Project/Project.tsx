import ProjectEntity from "components/shared/ProjectEntity/ProjectEntity";
import { useEffect, useState } from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import ProjectData from "types/project";

import { Button, createStyles, makeStyles } from "@material-ui/core";

import { authRequest } from "../../../api/auth";
import ProjectDetails from "../../../components/Project/ProjectDetails";
import ProjectStatus from "../../../components/Project/ProjectStatus";
import Description from "../../../components/shared/Description";
import Spinner from "../../../components/shared/Spinner";
import * as S from "./Project.styles";
import ProjectParticipants from "./utils";

const useStyles = makeStyles(() =>
  createStyles({
    projectName: {
      color: "snow",
    },
    icon: { color: "#cc3399", fontSize: 55, marginRight: 15 },
  })
);

interface ProjectParams {
  projectName: string;
}

interface ProjectProps extends RouteComponentProps<ProjectParams> {}

const Project = ({ match }: ProjectProps) => {
  const { projectName } = match.params;
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const history = useHistory();

  const authCommunicator = authRequest();

  useEffect(() => {
    const getProject = async () => {
      const projectData = await authCommunicator
        .get(`/project/${projectName}`)
        .then((response) => response.data);
      setProject(projectData);
      setLoading(false);
    };
    getProject();
    return () => {
      setProject(null);
    };
  }, []);

  if (loading || project == null) {
    return <Spinner centered />;
  }

  const saveDescription = async (content: string): Promise<boolean> => {
    const r = await authCommunicator
      .patch(`/project/${project.name}/`, {
        description: content,
      })
      .then((response) => {
        setProject(response.data);
        return true;
      })
      .catch(() => false);
    return r;
  };

  return (
    <ProjectEntity name={projectName}>
      <ProjectStatus name={projectName} status={project.status} />
      <ProjectDetails owner={project.owner} createdAt={project.createdAt} />
      <Description onSave={saveDescription} content={project.description} />
      <S.ProjectViews>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/project/${projectName}/backlog`)}
        >
          Backlog
        </Button>
        <Button variant="contained" color="primary">
          Kanban Board
        </Button>
      </S.ProjectViews>
    </ProjectEntity>
  );
};

export default withRouter(Project);
