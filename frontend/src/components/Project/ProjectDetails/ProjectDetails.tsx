import "./ProjectDetails.scss";

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
interface ProjectDetailsProps {
  owner: UserData;
  createdAt: string;
}

const ProjectDetails = (props: ProjectDetailsProps) => {
  const { owner, createdAt } = props;

  const classes = useStyles();

  const ownerAvatar = <Avatar src={owner.avatar} className={classes.avatar} />;
  const ownerName = `${owner.firstName} ${owner.lastName}`;

  return (
    <>
      <DetailEntry
        name="Owner"
        editButton={
          <Button variant="contained" color="primary">
            Transfer Ownership
          </Button>
        }
      >
        {ownerAvatar}
        <Typography>{ownerName}</Typography>
      </DetailEntry>
      <DetailEntry
        name="Created at"
        editButton={
          <Button variant="contained" color="secondary">
            Delete Project
          </Button>
        }
      >
        <Typography>{createdAt}</Typography>
      </DetailEntry>
    </>
  );
};

export default ProjectDetails;
