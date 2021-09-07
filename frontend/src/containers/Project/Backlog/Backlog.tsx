import { authRequest } from "api/auth";
import BacklogTable from "components/Project/BacklogTable";
import CenteredDiv from "components/shared/CenteredDiv";
import Spinner from "components/shared/Spinner";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { TableRowInterface, TaskData, WriteTaskData, ProjectData } from "types";
import CreateTask from "components/Task/CreateTask";
import { TaskIcons } from "models";

interface BacklogParams {
  projectName: string;
}

interface BacklogRowInterface extends TableRowInterface {
  icon?: React.ReactNode;
  status: string;
  title: string;
  type: string;
  owner: string;
  assignee: string;
}

interface BacklogProps extends RouteComponentProps<BacklogParams> {}

const Backlog = ({ match }: BacklogProps) => {
  const [rows, setRows] = useState<TableRowInterface[]>([]);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const { projectName } = match.params;
  const authCommunicator = authRequest();

  const createTask = async (task: WriteTaskData) => {
    await authCommunicator.post("/task/", task);
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksCollected: BacklogRowInterface[] = [];
      const projectTasks = await authCommunicator.get(
        `/project/${projectName}/backlog`
      );
      await Promise.all(
        projectTasks.data.map(async (taskData: TaskData) => {
          const { owner, assignee } = taskData;
          const ownerString =
            owner === null
              ? "<unassigned>"
              : `${owner.firstName} ${owner.lastName}`;
          const assigneeString =
            assignee === null
              ? "<unassigned>"
              : `${assignee.firstName} ${assignee.lastName}`;
          const Icon = TaskIcons[taskData.type];
          tasksCollected.push({
            icon: <Icon />,
            name: taskData.name,
            status: taskData.status,
            title: taskData.title,
            type: taskData.type,
            owner: ownerString,
            assignee: assigneeString,
          });
        })
      );
      setRows(tasksCollected);
    };
    const getProject = async () => {
      const project = await authCommunicator.get(`/project/${projectName}`);
      setProjectData(project.data);
    };
    getTasks();
    getProject();
    return () => {
      setRows([]);
      setProjectData(null);
    };
  }, []);

  if (rows.length === 0 || projectData === null) {
    return (
      <CenteredDiv>
        <Spinner />
      </CenteredDiv>
    );
  }

  return (
    <CenteredDiv>
      <BacklogTable rows={rows} />
      <CreateTask project={projectData} onSubmit={createTask} />
    </CenteredDiv>
  );
};

export default withRouter(Backlog);
