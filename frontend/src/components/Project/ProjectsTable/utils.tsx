interface ProjectsTableColumn {
  id: "name" | "status" | "owner" | "created_at";
  label: string;
  minWidth?: number;
  align?: "right";
}

interface ProjectsTableRow {
  name: string;
  status: string;
  owner: string;
  created_at: string;
}

export type { ProjectsTableColumn, ProjectsTableRow };
