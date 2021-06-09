import "./Projects.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Typography } from "@material-ui/core";

import { authRequest } from "../../../api/auth";
import ProjectsTable from "../../../components/Project/ProjectsTable";
import { ProjectData, TableRowInterface } from "../../../types";
import Spinner from "../../../components/shared/Spinner";

const Projects = () => {
  const [rows, setRows] = useState<TableRowInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      const projectsCollected: TableRowInterface[] = [];
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
      setLoading(false);
    };
    getProjects();
  }, []);
  if (loading) {
    return <Spinner centered />;
  }
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
