import { authRequest } from "api/auth";
import getUser from "api/user";
import KanbanRow from "components/Kanban/KanbanRow";
import Spinner from "components/shared/Spinner";
import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Dictionary, TaskData } from "types";

import { Grid } from "@material-ui/core";

import * as S from "./Kanban.styles";

interface KanbanParams {
  projectName: string;
}

interface KanbanProps extends RouteComponentProps<KanbanParams> {}

const Kanban = ({ match }: KanbanProps) => {
  const { projectName } = match.params;
  const authCommunicator = authRequest();
  const [usersTasks, setUsersTasks] = useState<Dictionary<TaskData[]> | null>(
    null
  );
  useEffect(() => {
    const getTasks = async () => {
      const projectTasks = await authCommunicator.get(
        `/project/${projectName}/kanban`
      );
      setUsersTasks(projectTasks.data);
    };
    getTasks();
    return () => {
      setUsersTasks([]);
    };
  }, []);

  if (usersTasks === null) {
    return <Spinner />;
  }
  return (
    <S.Kanban>
      <S.KanbanColumnHeaderRow>
        <Grid item xs={12} md={3}>
          <S.KanbanColumnHeader>To do</S.KanbanColumnHeader>
        </Grid>
        <Grid item xs={12} md={3}>
          <S.KanbanColumnHeader>In progress</S.KanbanColumnHeader>
        </Grid>
        <Grid item xs={12} md={3}>
          <S.KanbanColumnHeader>In review</S.KanbanColumnHeader>
        </Grid>
        <Grid item xs={12} md={3}>
          <S.KanbanColumnHeader>Done</S.KanbanColumnHeader>
        </Grid>
      </S.KanbanColumnHeaderRow>
      {Object.keys(usersTasks).map(async (userId) => {
        const tasks: TaskData[] = usersTasks[userId];
        const toDo = tasks.filter((task) => task.status === "To do");
        const inProgress = tasks.filter(
          (task) => task.status === "In progress"
        );
        const inReview = tasks.filter((task) => task.status === "In review");
        const done = tasks.filter((task) => task.status === "Done");
        const initialColumns = {
          toDo: { id: "toDo", tasks: toDo },
          inProgress: {
            id: "inProgress",
            tasks: inProgress,
          },
          inReview: { id: "inReview", tasks: inReview },
          done: { id: "done", tasks: done },
        };
        const user = await getUser(userId);
        if (user) {
          return <KanbanRow initialColumns={initialColumns} userData={user} />;
        }
        return null;
      })}
    </S.Kanban>
  );
};

export default withRouter(Kanban);
