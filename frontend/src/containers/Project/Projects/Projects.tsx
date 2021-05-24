import "./Projects.scss";

import { useEffect, useState } from "react";

import { Typography } from "@material-ui/core";

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
          const ownerData = await authRequest().get(`/user/${owner}`);
          projectsCollected.push({
            name: projectData.name,
            status: projectData.status,
            owner: `${ownerData.data.first_name} ${ownerData.data.last_name}`,
            created_at: projectData.created_at,
          });
        })
      );
      setRows(projectsCollected);
    };
    getProjects();
  }, []);
  return (
    <div className="hahaxd">
      {rows.length === 0 ? (
        <Typography variant="h1" className="no-projects">
          You have no projects
        </Typography>
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
