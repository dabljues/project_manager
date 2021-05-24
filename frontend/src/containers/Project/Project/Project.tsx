import "./Project.scss";

import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { authRequest } from "../../../api/auth";
import ProjectData from "../../../types/project";

interface ProjectParams {
  projectName: string;
}

interface ProjectProps extends RouteComponentProps<ProjectParams> {}

const Project = ({ match }: ProjectProps) => {
  const { projectName } = match.params;
  const [project, setProject] = useState<ProjectData | null>(null);

  const authCommunicator = authRequest();
  useEffect(() => {
    const getProject = async () => {
      const projectData = await authCommunicator
        .get(`/project/${projectName}`)
        .then((response) => response.data);
      setProject(projectData);
    };
    getProject();
    return () => {
      setProject(null);
    };
  }, []);

  return (
    <>
      <div className="project">
        <div>
          <Typography variant="h2" className="project-name">
            {project?.name}
          </Typography>
        </div>
        <p>Details:</p>

        <p>Project name: {project?.name}</p>
        <p>Project status: {project?.status}</p>
        <p>
          Project owner: {project?.owner.firstName} {project?.owner.lastName}
        </p>
        <p>Created at: {project?.createdAt}</p>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{project?.description}</Typography>
          </AccordionDetails>
        </Accordion>
        <div className="project-actions">
          <div className="project-views">
            <Button variant="contained" color="primary">
              Backlog
            </Button>
            <Button variant="contained" color="primary">
              Kanban Board
            </Button>
          </div>
          <Button variant="contained" color="primary">
            Edit Project
          </Button>
          <Button variant="contained" color="primary">
            Transfer Ownership
          </Button>
          <Button variant="contained" color="secondary">
            Delete Project
          </Button>
        </div>
      </div>
    </>
  );
};

export default withRouter(Project);
