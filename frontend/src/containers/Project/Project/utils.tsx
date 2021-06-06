import {
  makeStyles,
  createStyles,
  Typography,
  Button,
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

interface ProjectStatusRowProps {
  projectStatus: string;
}

const ProjectStatusRow = (props: ProjectStatusRowProps) => {
  const { projectStatus } = props;
  const classes = useStyles();

  return (
    <div className="status-row">
      <Typography
        variant="h4"
        className={
          projectStatus === "Open" ? classes.openProject : classes.closedProject
        }
      >
        {projectStatus}
      </Typography>
      <Button variant="contained" color="primary">
        {projectStatus === "Open" ? "Close project" : "Open project"}
      </Button>
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

export { ProjectStatusRow, ProjectParticipants };
