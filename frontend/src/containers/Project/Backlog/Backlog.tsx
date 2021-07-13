import CenteredDiv from "components/shared/CenteredDiv";
import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { authRequest } from "../../../api/auth";
import BacklogTable from "../../../components/Project/BacklogTable";
import { TableRowInterface, TaskData } from "../../../types";

interface BacklogParams {
  projectName: string;
}

interface BacklogProps extends RouteComponentProps<BacklogParams> {}

const Backlog = ({ match }: BacklogProps) => {
  const [rows, setRows] = useState<TableRowInterface[]>([]);
  const { projectName } = match.params;

  const authCommunicator = authRequest();
  useEffect(() => {
    const getTasks = async () => {
      const tasksCollected: TableRowInterface[] = [];
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
          tasksCollected.push({
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
    getTasks();
    return () => {
      setRows([]);
    };
  }, []);

  return (
    <CenteredDiv>
      <BacklogTable rows={rows} />{" "}
    </CenteredDiv>
  );
};

export default withRouter(Backlog);
