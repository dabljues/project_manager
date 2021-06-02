import "./Backlog.scss";

import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { authRequest } from "../../../api/auth";
import { TaskData } from "../../../types";

interface BacklogParams {
  projectName: string;
}

interface BacklogProps extends RouteComponentProps<BacklogParams> {}

const Backlog = ({ match }: BacklogProps) => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const { projectName } = match.params;

  const authCommunicator = authRequest();
  useEffect(() => {
    const getTasks = async () => {
      const projectTasks = await authCommunicator
        .get(`/project/${projectName}/backlog`)
        .then((response) => response.data);
      setTasks(projectTasks);
    };
    getTasks();
    return () => {
      setTasks([]);
    };
  }, []);

  return <div>{projectName}</div>;
};

export default withRouter(Backlog);
