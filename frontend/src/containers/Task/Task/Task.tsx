import "./Task.scss";

import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import {
  Avatar,
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { authRequest } from "../../../api/auth";
import Spinner from "../../../components/Spinner";
import { TaskData } from "../../../types";
import StatusRow from "../../../components/StatusRow";
import DetailEntry from "../../../components/DetailEntry";
import Description from "../../../components/Description";
import TaskStatus from "../../../components/Task/TaskStatus";
import TaskDetails from "../../../components/Task/TaskDetails";

const useStyles = makeStyles(() =>
  createStyles({
    taskName: {
      color: "snow",
    },
    infoLabel: {
      fontWeight: "bold",
    },
    icon: {
      color: "white",
      fontSize: 55,
      marginRight: 15,
    },
  })
);

interface TaskParams {
  taskName: string;
}

interface TaskProps extends RouteComponentProps<TaskParams> {}

const Task = ({ match }: TaskProps) => {
  const { taskName } = match.params;
  const [task, setTask] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

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
    <div className="task">
      <div className="task-name">
        <AssignmentIcon className={classes.icon} />
        <Typography variant="h2" className={classes.taskName}>
          {task.name}
        </Typography>
      </div>
      <div className="task-info">
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
      </div>
    </div>
  );
};

export default withRouter(Task);
