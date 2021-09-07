import { renderUser } from "helpers";
import { TaskIcons } from "models";
import React from "react";
import styled from "styled-components/macro";

import {
  TableColumnInterface,
  TableRowInterface,
  TaskData,
} from "../../../types";
import PaginatedTable from "../../shared/PaginatedTable";

interface BacklogRowInterface extends TableRowInterface {
  icon?: React.ReactNode;
  status: string;
  title: string;
  type: string;
  owner: React.ReactNode;
  assignee: React.ReactNode;
}

const TaskIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface BacklogTableProps {
  tasks: TaskData[];
}

const BacklogTable = (props: BacklogTableProps) => {
  const { tasks } = props;
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

  const rows: BacklogRowInterface[] = tasks.map((taskData: TaskData) => {
    const { owner, assignee } = taskData;
    const ownerInfo = owner === null ? "<unassigned>" : renderUser(owner);
    const assigneeInfo =
      assignee === null ? "<unassigned>" : renderUser(assignee);
    const Icon = TaskIcons[taskData.type];
    console.log(Icon);
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
  });

  return (
    <PaginatedTable
      columns={columns}
      rows={rows}
      rowClickConfig={{ rowKey: "name", to: "/task/:id" }}
    />
  );
};

export default BacklogTable;
