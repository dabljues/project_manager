import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { authRequest } from "../../../api/auth";
import Description from "../../../components/shared/Description";
import Spinner from "../../../components/shared/Spinner";
import TaskDetails from "../../../components/Task/TaskDetails";
import TaskStatus from "../../../components/Task/TaskStatus";
import { TaskData } from "../../../types";
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
    <S.Task>
      <S.TaskHeader>
        <S.TaskIcon />
        <S.TaskName>{task.name}</S.TaskName>
      </S.TaskHeader>
      <S.TaskInfo>
        <TaskStatus name={task.name} status={task.status} />
        <TaskDetails
          title={task.title}
          type={task.type}
          creator={task.creator}
          assignee={task.assignee}
          createdAt={task.createdAt}
        />
        <Description
          onChangeSubmit={saveDescription}
          content={task.description}
        />
      </S.TaskInfo>
    </S.Task>
  );
};

export default withRouter(Task);
