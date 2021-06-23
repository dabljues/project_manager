import { authRequest } from "api/auth";
import Description from "components/shared/Description";
import ProjectEntity from "components/shared/ProjectEntity/ProjectEntity/ProjectEntity";
import Spinner from "components/shared/Spinner";
import TaskDetails from "components/Task/TaskDetails";
import TaskStatus from "components/Task/TaskStatus";
import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { TaskData } from "types";

import * as S from "./Task.styles";

interface TaskParams {
  taskName: string;
}

interface TaskProps extends RouteComponentProps<TaskParams> {}

const Task = ({ match }: TaskProps) => {
  const { taskName } = match.params;
  const [task, setTask] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);

  const authCommunicator = authRequest();

  useEffect(() => {
    const getTask = async () => {
      const taskData = await authCommunicator
        .get(`/task/${taskName}`)
        .then((response) => response.data);
      setTask(taskData);
      setLoading(false);
    };
    getTask();
    return () => {
      setTask(null);
    };
  }, []);

  if (loading || task == null) {
    return <Spinner centered />;
  }

  const saveDescription = async (content: string): Promise<boolean> => {
    const r = await authCommunicator
      .patch(`/task/${task.name}/`, {
        description: content,
      })
      .then((response) => {
        setTask(response.data);
        return true;
      })
      .catch(() => false);
    return r;
  };

  return (
    <ProjectEntity name={taskName}>
      <TaskStatus name={taskName} status={task.status} />
      <TaskDetails task={task} />
      <Description onSave={saveDescription} content={task.description} />
    </ProjectEntity>
  );
};

export default withRouter(Task);
