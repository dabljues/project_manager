interface ProjectsTableColumn {
  id: "name" | "status" | "owner" | "createdAt";
  label: string;
  minWidth?: number;
  align?: "right";
}

interface ProjectsTableRow {
  name: string;
  status: string;
  owner: string;
  createdAt: string;
}

export type { ProjectsTableColumn, ProjectsTableRow };
