import { authRequest } from "api/auth";
import Description from "components/shared/Description";
import ProjectEntity from "components/shared/ProjectEntity/ProjectEntity/ProjectEntity";
import Spinner from "components/shared/Spinner";
import SubTasksTable from "components/Task/SubTasksTable";
import TaskDetails from "components/Task/TaskDetails";
import TaskStatus from "components/Task/TaskStatus";
import { TaskIcons } from "models";
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
  const [subTasks, setSubTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);

  const authCommunicator = authRequest();

  useEffect(() => {
    const getTask = async () => {
      const taskData = await authCommunicator
        .get(`/task/${taskName}`)
        .then((response) => response.data);
      const subTasksData = await authCommunicator
        .get(`/task/${taskName}/sub_tasks`)
        .then((response) => response.data);
      setTask(taskData);
      setSubTasks(subTasksData);
      setLoading(false);
    };
    getTask();
    return () => {
      setTask(null);
    };
  }, [taskName]);

  if (loading || task == null) {
    return <Spinner centered />;
  }

  const icon = task.type === "Task" ? S.TaskIcon : TaskIcons[task.type];

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
    <ProjectEntity name={taskName} icon={icon}>
      <TaskStatus name={taskName} status={task.status} />
      <TaskDetails task={task} />
      <Description onSave={saveDescription} content={task.description} />
      <SubTasksTable
        projectName={task.project.name}
        parentName={task.name}
        subTasks={subTasks}
      />
    </ProjectEntity>
  );
};

export default withRouter(Task);
