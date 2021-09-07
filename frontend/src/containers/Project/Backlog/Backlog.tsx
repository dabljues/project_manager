import { authRequest } from "api/auth";
import BacklogTable from "components/Project/BacklogTable";
import CenteredDiv from "components/shared/CenteredDiv";
import Spinner from "components/shared/Spinner";
import CreateTask from "components/Task/CreateTask";
import { renderUser } from "helpers";
import { TaskIcons } from "models";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ProjectData, TableRowInterface, TaskData, WriteTaskData } from "types";

interface BacklogParams {
  projectName: string;
}

interface BacklogRowInterface extends TableRowInterface {
  icon?: React.ReactNode;
  status: string;
  title: string;
  type: string;
  owner: React.ReactNode;
  assignee: React.ReactNode;
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
          const ownerInfo = owner === null ? "<unassigned>" : renderUser(owner);
          const assigneeInfo =
            assignee === null ? "<unassigned>" : renderUser(assignee);
          const icon = TaskIcons[taskData.type];
          tasksCollected.push({
            icon,
            name: taskData.name,
            status: taskData.status,
            title: taskData.title,
            type: taskData.type,
            owner: ownerInfo,
            assignee: assigneeInfo,
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
