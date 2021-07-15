import UserData from "./userData";

interface ProjectData {
  id: number;
  name: string;
  status: string;
  owner: UserData | null;
  participants: UserData[];
  description: string;
  createdAt: string;
}

export default ProjectData;
