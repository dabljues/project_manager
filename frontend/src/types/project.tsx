import UserData from "./userData";

interface ProjectData {
  name: string;
  status: string;
  owner: UserData;
  participants: UserData[];
  description: string;
  created_at: string;
}

export default ProjectData;
