import UserData from "./userData";

interface TaskData {
  name: string;
  status: string;
  title: string;
  description: string;
  createdAt: string;
  lastUpdated: string;
  type: string;

  owner: UserData | null;
  assignee: UserData | null;

  project: { id: number; name: string };
}

interface WriteTaskData {
  status: string;
  title: string;
  description: string;
  type: string;
  owner: number | null;
  assignee: number | null;
  project: string;
}

export type { TaskData, WriteTaskData };
