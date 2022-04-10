import { Typography } from "@material-ui/core";
import CenteredDiv from "components/shared/CenteredDiv";
import { renderUser } from "helpers";
import { TaskIcons } from "models";
import React from "react";
import styled from "styled-components/macro";
import { TableColumnInterface, TableRowInterface, TaskData } from "types";

import PaginatedTable from "../../shared/PaginatedTable";

interface SubTaskTableRowInterface extends TableRowInterface {
  icon?: React.ReactNode;
  status: string;
  title: string;
  type: string;
  owner: React.ReactNode;
  assignee: React.ReactNode;
}

interface SubTasksTableProps {
  projectName: string;
  parentName: string;
  subTasks: TaskData[];
}

const TaskIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubTasksTable = (props: SubTasksTableProps) => {
  const { projectName, parentName, subTasks } = props;

  if (subTasks.length === 0) {
    return (
      <CenteredDiv>
        <Typography>Tasks has no subtasks</Typography>
      </CenteredDiv>
    );
  }

  const columns: TableColumnInterface[] = [
    { id: "icon", label: "" },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
    },
    { id: "status", label: "Status", minWidth: 50 },
    { id: "title", label: "Title", minWidth: 50 },
    { id: "type", label: "Type", minWidth: 50 },
    {
      id: "owner",
      label: "Owner",
      minWidth: 250,
      align: "right",
    },
    {
      id: "assignee",
      label: "Assignee",
      minWidth: 170,
      align: "right",
    },
  ];

  const rows: SubTaskTableRowInterface[] = subTasks.map(
    (taskData: TaskData) => {
      const { owner, assignee } = taskData;
      const ownerInfo = owner === null ? "<unassigned>" : renderUser(owner);
      const assigneeInfo =
        assignee === null ? "<unassigned>" : renderUser(assignee);
      const Icon = TaskIcons[taskData.type];
      return {
        icon: (
          <TaskIcon>
            <Icon />
          </TaskIcon>
        ),
        name: taskData.name,
        status: taskData.status,
        title: taskData.title,
        type: taskData.type,
        owner: ownerInfo,
        assignee: assigneeInfo,
      };
    }
  );
  return (
    <CenteredDiv>
      <Typography variant="h4">Subtasks:</Typography>
      <PaginatedTable
        columns={columns}
        rows={rows}
        rowClickConfig={{
          rowKey: "name",
          to: `/${projectName}/${parentName}/:id`,
        }}
      />
    </CenteredDiv>
  );
};

export default SubTasksTable;
