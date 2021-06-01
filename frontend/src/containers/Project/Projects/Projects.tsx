import "./Projects.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Typography } from "@material-ui/core";

import { authRequest } from "../../../api/auth";
import ProjectsTable, {
  ProjectsTableRow,
} from "../../../components/Project/ProjectsTable";
import { ProjectData } from "../../../types";

const Projects = () => {
  const [rows, setRows] = useState<ProjectsTableRow[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      const projectsCollected: ProjectsTableRow[] = [];
      const projectsData = await authRequest().get("/project");
      await Promise.all(
        projectsData.data.map(async (projectData: ProjectData) => {
          const { owner } = projectData;
          const ownerString =
            owner === null
              ? "<unassigned>"
              : `${owner.firstName} ${owner.lastName}`;
          projectsCollected.push({
            name: projectData.name,
            status: projectData.status,
            owner: ownerString,
            createdAt: projectData.createdAt,
          });
        })
      );
      setRows(projectsCollected);
    };
    // const x = [];
    // let i;
    // for (i = 0; i <= 20; i += 1) {
    //   x.push({ name: "xD", status: "open", owner: "haha", created_at: "xD" });
    // }
    // setRows(x);
    getProjects();
  }, []);
  return (
    <div className="center">
      {rows.length === 0 ? (
        <div className="text-align-center">
          <Typography variant="h1" className="no-projects">
            You have no projects
          </Typography>
          <Link to="/project/create" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              Create your first project
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <Typography variant="h2" className="projets-table-title">
            Your projects:
          </Typography>
          <ProjectsTable rows={rows} />
        </>
      )}
    </div>
  );
};

export default Projects;
