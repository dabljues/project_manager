import UserData from "./userData";

interface TaskData {
  name: string;
  status: string;
  title: string;
  description: string;
  createdAt: string;
  lastUpdated: string;
  type: string;

  creator: UserData;
  assignee: UserData;

  project: number;
}

export default TaskData;
