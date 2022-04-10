import { Typography } from "@material-ui/core";
import { authRequest } from "api/auth";
import BacklogTable from "components/Project/BacklogTable";
import CenteredDiv from "components/shared/CenteredDiv";
import Spinner from "components/shared/Spinner";
import CreateTask from "components/Task/CreateTask";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components/macro";
import { WriteTaskData } from "types";
import useSWR from "swr";

interface BacklogParams {
  projectName: string;
}

const BacklogTitle = styled(Typography)`
  margin-bottom: 3rem;
`;

const authCommunicator = authRequest();

interface BacklogProps extends RouteComponentProps<BacklogParams> {}

const Backlog = ({ match }: BacklogProps) => {
  const { projectName } = match.params;
  const {
    data: tasks,
    error: errorTasks,
    mutate,
  } = useSWR(`/project/${projectName}/backlog`, (url: string) =>
    authCommunicator.get(url).then((res) => res.data)
  );
  const { data: projectData, error: errorProjectData } = useSWR(
    `/project/${projectName}`,
    (url: string) => authCommunicator.get(url).then((res) => res.data)
  );

  const createTask = async (task: WriteTaskData) => {
    await authCommunicator.post("/task/", task);
    mutate();
  };

  if (
    errorTasks ||
    errorProjectData ||
    !tasks ||
    !projectData ||
    projectData === null
  ) {
    return (
      <CenteredDiv>
        <Spinner />
      </CenteredDiv>
    );
  }

  return (
    <CenteredDiv>
      <BacklogTitle variant="h1">{projectData.name} backlog</BacklogTitle>
      <BacklogTable projectName={projectName} tasks={tasks} />
      <CreateTask project={projectData} onSubmit={createTask} />
    </CenteredDiv>
  );
};

export default withRouter(Backlog);
