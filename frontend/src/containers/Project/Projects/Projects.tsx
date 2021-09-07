import CenteredDiv from "components/shared/CenteredDiv";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import { Button, Typography } from "@material-ui/core";

import { authRequest } from "../../../api/auth";
import ProjectsTable from "../../../components/Project/ProjectsTable";
import Spinner from "../../../components/shared/Spinner";
import { ProjectData, TableRowInterface } from "../../../types";

const NoProjects = styled.div`
  text-align: center;
  margin: 50px !important;
`;

const CreateProjectLink = styled(Link)`
  text-decoration: none;
`;

interface ProjectsRowInterface extends TableRowInterface {
  icon?: React.ReactNode;
  status: string;
  owner: string;
  createdAt: string;
}

const Projects = () => {
  const [rows, setRows] = useState<TableRowInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      const projectsCollected: ProjectsRowInterface[] = [];
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
    <CenteredDiv>
      {rows.length === 0 ? (
        <NoProjects>
          <Typography variant="h1">You have no projects</Typography>
          <CreateProjectLink to="/project/create">
            <Button variant="contained" color="secondary">
              Create your first project
            </Button>
          </CreateProjectLink>
        </NoProjects>
      ) : (
        <>
          <Typography variant="h2">Your projects:</Typography>
          <ProjectsTable rows={rows} />
        </>
      )}
    </CenteredDiv>
  );
};

export default Projects;
