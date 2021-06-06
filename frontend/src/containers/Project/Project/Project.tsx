import "./Project.scss";

import { useEffect, useState } from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GroupWorkIcon from "@material-ui/icons/GroupWork";

import { authRequest } from "../../../api/auth";
import Spinner from "../../../components/Spinner";
import ProjectData from "../../../types/project";
import { ProjectParticipants, ProjectStatusRow } from "./utils";

const useStyles = makeStyles(() =>
  createStyles({
    projectName: {
      color: "snow",
    },
    infoLabel: {
      fontWeight: "bold",
    },
  })
);

interface ProjectEditRowProps {
  name: string;
  content: string;
  editButton: JSX.Element;
}

const ProjectEditRow = (props: ProjectEditRowProps) => {
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

interface ProjectParams {
  projectName: string;
}

interface ProjectProps extends RouteComponentProps<ProjectParams> {}

const Project = ({ match }: ProjectProps) => {
  const { projectName } = match.params;
  const [project, setProject] = useState<ProjectData | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const history = useHistory();

  const authCommunicator = authRequest();
  useEffect(() => {
    const getProject = async () => {
      const projectData = await authCommunicator
        .get(`/project/${projectName}`)
        .then((response) => response.data);
      setProject(projectData);
      setLoading(false);
    };
    getProject();
    return () => {
      setProject(null);
    };
  }, []);

  if (loading || project == null) {
    return <Spinner centered />;
  }

  return (
    <div className="project">
      <div className="project-name">
        <GroupWorkIcon
          style={{ color: "#cc3399", fontSize: 55, marginRight: 15 }}
        />
        <Typography variant="h2" className={classes.projectName}>
          {project.name}
        </Typography>
      </div>
      <div className="project-details">
        <ProjectStatusRow projectStatus={project.status} />
        <div>
          <ProjectEditRow
            name="Owner"
            content={`${project.owner.firstName} ${project.owner.lastName}`}
            editButton={
              <Button variant="contained" color="primary">
                Transfer Ownership
              </Button>
            }
          />
          <ProjectEditRow
            name="Created at"
            content={project.createdAt}
            editButton={
              <Button variant="contained" color="secondary">
                Delete Project
              </Button>
            }
          />
        </div>
        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontWeight: "bold", marginRight: 20 }}>
              Description
            </Typography>
            {expanded ? (
              <EditIcon />
            ) : (
              <Typography>{project.description.slice(0, 30)}...</Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              multiline
              variant="outlined"
              fullWidth
              defaultValue={project.description}
              style={{}}
            />
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="project-views">
        <div className="views-position">
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/project/${projectName}/backlog`)}
          >
            Backlog
          </Button>
          <Button variant="contained" color="primary">
            Kanban Board
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Project);
