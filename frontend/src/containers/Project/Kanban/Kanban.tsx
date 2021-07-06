import { Grid } from "@material-ui/core";
import { authRequest } from "api/auth";
import KanbanRow from "components/Kanban/KanbanRow";
import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Dictionary, TaskData, UserData } from "types";

import * as S from "./Kanban.styles";

interface KanbanParams {
  projectName: string;
}

interface KanbanProps extends RouteComponentProps<KanbanParams> {}

const Kanban = ({ match }: KanbanProps) => {
  const { projectName } = match.params;
  const authCommunicator = authRequest();
  const [usersTasks, setUsersTasks] = useState<Dictionary<TaskData[]>>({});
  useEffect(() => {
    const x: Dictionary<TaskData[]> = {};
    const getTasks = async () => {
      const projectTasks = await authCommunicator.get(
        `/project/${projectName}/kanban`
      );
      await Promise.all(
        projectTasks.data.map(async (taskData: TaskData) => {
          const { assignee } = taskData;
          const assigneId = assignee.id;
          if (x[assigneId]) {
            x[assigneId].push(taskData);
          } else {
            x[assigneId] = [];
            x[assigneId].push(taskData);
          }
        })
      );
      setUsersTasks(x);
    };
    getTasks();
    return () => {
      setUsersTasks({});
    };
  }, []);
  return (
    <S.Kanban>
      <S.KanbanColumnHeaderRow>
        <Grid item xs={12} sm={3}>
          <S.KanbanColumnHeader>To do</S.KanbanColumnHeader>
        </Grid>
        <Grid item xs={12} sm={3}>
          <S.KanbanColumnHeader>In progress</S.KanbanColumnHeader>
        </Grid>
        <Grid item xs={12} sm={3}>
          <S.KanbanColumnHeader>In review</S.KanbanColumnHeader>
        </Grid>
        <Grid item xs={12} sm={3}>
          <S.KanbanColumnHeader>Done</S.KanbanColumnHeader>
        </Grid>
      </S.KanbanColumnHeaderRow>
      {Object.keys(usersTasks).map((userId) => {
        const tasks: TaskData[] = usersTasks[userId];
        const toDo = tasks.filter((task) => task.status === "TD");
        const inProgress = tasks.filter((task) => task.status === "IP");
        const inReview = tasks.filter((task) => task.status === "IR");
        const done = tasks.filter((task) => task.status === "DN");
        // const userData =
        const initialColumns = {
          toDo: { id: "toDo", tasks: toDo },
          inProgress: {
            id: "inProgress",
            tasks: inProgress,
          },
          inReview: { id: "inReview", tasks: inReview },
          done: { id: "done", tasks: done },
        };
        return (
          <KanbanRow initialColumns={initialColumns} userData={userData} />
        );
      })}
    </S.Kanban>
  );
};

export default withRouter(Kanban);
