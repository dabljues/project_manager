import "./TaskDetails.scss";

import {
  Avatar,
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { UserData } from "../../../types";
import DetailEntry from "../../DetailEntry";

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      marginRight: 15,
    },
  })
);
interface TaskDetailsProps {
  title: string;
  type: string;
  creator: UserData;
  assignee: UserData;
  createdAt: string;
}

const TaskDetails = (props: TaskDetailsProps) => {
  const { title, type, creator, assignee, createdAt } = props;

  const classes = useStyles();

  const creatorAvatar = (
    <Avatar src={creator.avatar} className={classes.avatar} />
  );
  const assigneAvatar = (
    <Avatar src={assignee.avatar} className={classes.avatar} />
  );
  const creatorName = `${creator.firstName} ${creator.lastName}`;
  const assigneeName = `${assignee.firstName} ${assignee.lastName}`;

  return (
    <>
      <DetailEntry
        name="Title"
        editButton={
          <Button variant="contained" color="primary">
            Change title
          </Button>
        }
      >
        <Typography>{title}</Typography>
      </DetailEntry>
      <DetailEntry
        name="Type"
        editButton={
          <Button variant="contained" color="primary">
            Change type
          </Button>
        }
      >
        <Typography>{type}</Typography>
      </DetailEntry>
      <DetailEntry
        name="Creator"
        editButton={
          <Button variant="contained" color="primary">
            Transfer Ownership
          </Button>
        }
      >
        {creatorAvatar}
        <Typography>{creatorName}</Typography>
      </DetailEntry>
      <DetailEntry
        name="Assignee"
        editButton={
          <Button variant="contained" color="primary">
            Assign
          </Button>
        }
      >
        {assigneAvatar}
        <Typography>{assigneeName}</Typography>
      </DetailEntry>
      <DetailEntry
        name="Created at"
        editButton={
          <Button variant="contained" color="secondary">
            Delete Task
          </Button>
        }
      >
        <Typography>{createdAt}</Typography>
      </DetailEntry>
    </>
  );
};

export default TaskDetails;
