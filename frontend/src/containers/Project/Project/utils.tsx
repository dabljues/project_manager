import "./Project.scss";

import {
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { UserData } from "../../../types";

const useStyles = makeStyles(() =>
  createStyles({
    infoLabel: {
      fontWeight: "bold",
    },
    openProject: {
      color: "green",
      flex: 1,
    },
    closedProject: {
      color: "red",
      flex: 1,
    },
  })
);
interface ProjectInfoRowProps {
  name: string;
  content: JSX.Element | string;
  editButton: JSX.Element;
}

const ProjectInfoRow = (props: ProjectInfoRowProps) => {
  const { name, content, editButton } = props;
  const classes = useStyles();

  return (
    <div className="info-row">
      <div className="info">
        <div className="label">
          <Typography variant="h5" className={classes.infoLabel}>
            {name}
          </Typography>
        </div>
        <Typography variant="h6">{content}</Typography>
      </div>
      <div className="edit">{editButton}</div>
    </div>
  );
};

interface ProjectParticipantsProps {
  participants: UserData[];
}

const ProjectParticipants = (props: ProjectParticipantsProps) => {
  const { participants } = props;
  return <div>xD</div>;
};

export { ProjectParticipants, ProjectInfoRow };
