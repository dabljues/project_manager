import UserData from "./userData";

interface TaskData {
  id: number;
  name: string;
  status: string;
  title: string;
  description: string;
  createdAt: string;
  lastUpdated: string;
  type: string;
  parent: { id: number; name: string } | null;

  owner: UserData | null;
  assignee: UserData | null;

  project: { id: number; name: string };
}

interface WriteTaskData {
  title: string;
  owner: number | null;
  project: number;
  description?: string;
  status?: string;
  type?: string;
  assignee?: number | null;
  parent?: number | null;
}

export type { TaskData, WriteTaskData };
