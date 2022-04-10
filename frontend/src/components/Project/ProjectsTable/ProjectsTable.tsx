import { renderUser } from "helpers";
import React from "react";

import {
  ProjectData,
  TableColumnInterface,
  TableRowInterface,
} from "../../../types";
import PaginatedTable from "../../shared/PaginatedTable";

interface ProjectsRowInterface extends TableRowInterface {
  icon?: React.ReactNode;
  status: string;
  owner: React.ReactNode;
  createdAt: string;
}

interface ProjectsTableProps {
  projects: ProjectData[];
}

const ProjectsTable = (props: ProjectsTableProps) => {
  const { projects } = props;
  const columns: TableColumnInterface[] = [
    {
      id: "name",
      label: "Name",
      minWidth: 170,
    },
    { id: "status", label: "Status", minWidth: 50 },
    {
      id: "owner",
      label: "Owner",
      minWidth: 250,
      align: "right",
    },
    {
      id: "createdAt",
      label: "Created at",
      minWidth: 170,
      align: "right",
    },
  ];

  const rows: ProjectsRowInterface[] = projects.map(
    (projectData: ProjectData) => {
      const { owner } = projectData;
      const ownerInfo = owner === null ? "<unassigned>" : renderUser(owner);
      return {
        name: projectData.name,
        status: projectData.status,
        owner: ownerInfo,
        createdAt: projectData.createdAt,
      };
    }
  );

  return (
    <PaginatedTable
      columns={columns}
      rows={rows}
      rowClickConfig={{ rowKey: "name", to: "/:id" }}
    />
  );
};

export default ProjectsTable;
