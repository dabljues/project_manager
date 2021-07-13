import UserData from "./userData";

interface TaskData {
  name: string;
  status: string;
  title: string;
  description: string;
  createdAt: string;
  lastUpdated: string;
  type: string;

  owner: UserData;
  assignee: UserData;

  project: { id: number; name: string };
}

export default TaskData;
