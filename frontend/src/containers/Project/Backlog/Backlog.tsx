import { authRequest } from "api/auth";
import BacklogTable from "components/Project/BacklogTable";
import CenteredDiv from "components/shared/CenteredDiv";
import Spinner from "components/shared/Spinner";
import CreateTask from "components/Task/CreateTask";
import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ProjectData, TaskData, WriteTaskData } from "types";

interface BacklogParams {
  projectName: string;
}

interface BacklogProps extends RouteComponentProps<BacklogParams> {}

const Backlog = ({ match }: BacklogProps) => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const { projectName } = match.params;
  const authCommunicator = authRequest();

  const createTask = async (task: WriteTaskData) => {
    await authCommunicator.post("/task/", task);
  };

  useEffect(() => {
    const getTasks = async () => {
      const projectTasks = await authCommunicator.get(
        `/project/${projectName}/backlog`
      );
      setTasks(projectTasks.data);
    };
    const getProject = async () => {
      const project = await authCommunicator.get(`/project/${projectName}`);
      setProjectData(project.data);
    };
    getTasks();
    getProject();
    return () => {
      setTasks([]);
      setProjectData(null);
    };
  }, []);

  if (tasks.length === 0 || projectData === null) {
    return (
      <CenteredDiv>
        <Spinner />
      </CenteredDiv>
    );
  }

  return (
    <CenteredDiv>
      <BacklogTable tasks={tasks} />
      <CreateTask project={projectData} onSubmit={createTask} />
    </CenteredDiv>
  );
};

export default withRouter(Backlog);
