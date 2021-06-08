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

const useStyles = makeStyles(() =>
  createStyles({
    taskName: {
      color: "snow",
    },
    infoLabel: {
      fontWeight: "bold",
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

  console.log(task);

  return (
    <div className="task">
      <div className="task-name">
        <AssignmentIcon
          style={{ color: "white", fontSize: 55, marginRight: 15 }}
        />
        <Typography variant="h2" className={classes.taskName}>
          {task.name}
        </Typography>
      </div>
      <div className="task-details">
        <StatusRow status={task.status}>
          <Button variant="contained">New</Button>
          <Button variant="contained">To do</Button>
          <Button variant="contained">In progress</Button>
          <Button variant="contained">In review</Button>
          <Button variant="contained" color="primary">
            Done
          </Button>
          <Button variant="contained" color="secondary">
            Close
          </Button>
        </StatusRow>
        <>
          <DetailEntry
            name="Title"
            content={task.title}
            editButton={
              <Button variant="contained" color="primary">
                Change title
              </Button>
            }
          />
          <DetailEntry
            name="Type"
            content={task.type}
            editButton={
              <Button variant="contained" color="primary">
                Change type
              </Button>
            }
          />
          <DetailEntry
            name="Creator"
            content={
              <div className="content">
                <Avatar src={task.creator.avatar} style={{ marginRight: 15 }} />
                {`${task.creator.firstName} ${task.creator.lastName}`}
              </div>
            }
            editButton={
              <Button variant="contained" color="primary">
                Transfer Ownership
              </Button>
            }
          />
          <DetailEntry
            name="Assignee"
            content={
              <div className="content">
                <Avatar
                  src={task.assignee.avatar}
                  style={{ marginRight: 15 }}
                />
                {`${task.assignee.firstName} ${task.assignee.lastName}`}
              </div>
            }
            editButton={
              <Button variant="contained" color="primary">
                Assign
              </Button>
            }
          />
          <DetailEntry
            name="Created at"
            content={task.createdAt}
            editButton={
              <Button variant="contained" color="secondary">
                Delete Task
              </Button>
            }
          />
        </>
        <Description
          onChangeSubmit={saveDescription}
          content={task.description}
        />
      </div>
    </div>
  );
};

export default withRouter(Task);
