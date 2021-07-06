import TaskData from "./task";

interface ColumnData {
  id: string;
  tasks: TaskData[];
}

interface RowData {
  id: string;
}

export type { ColumnData, RowData };
