import UserData from "./userData";

interface ProjectData {
  name: string;
  status: string;
  owner: UserData | null;
  participants: UserData[];
  description: string;
  createdAt: string;
}

export default ProjectData;
