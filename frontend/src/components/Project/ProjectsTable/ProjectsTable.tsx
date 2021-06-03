import "./ProjectsTable.scss";

import { TableColumnInterface, TableRowInterface } from "../../../types";
import PaginatedTable from "../../PaginatedTable";

interface ProjectsTableProps {
  rows: TableRowInterface[];
}

const ProjectsTable = (props: ProjectsTableProps) => {
  const { rows } = props;
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

  return <PaginatedTable columns={columns} rows={rows} />;
};

export default ProjectsTable;
