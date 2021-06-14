import { TableColumnInterface, TableRowInterface } from "../../../types";
import PaginatedTable from "../../shared/PaginatedTable";

interface BacklogTableProps {
  projectName: string;
  rows: TableRowInterface[];
}

const BacklogTable = (props: BacklogTableProps) => {
  const { projectName, rows } = props;
  const columns: TableColumnInterface[] = [
    {
      id: "name",
      label: "Name",
      minWidth: 170,
    },
    { id: "status", label: "Status", minWidth: 50 },
    { id: "title", label: "Title", minWidth: 50 },
    { id: "type", label: "Type", minWidth: 50 },
    {
      id: "creator",
      label: "Creator",
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

  return (
    <PaginatedTable
      columns={columns}
      rows={rows}
      rowClickConfig={{
        rowKey: "name",
        to: `/projects/${projectName}/:id`,
      }}
    />
  );
};

export default BacklogTable;
