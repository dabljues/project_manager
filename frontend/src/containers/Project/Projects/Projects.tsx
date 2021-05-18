import "./Projects.scss";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";

import { authRequest } from "../../../api/auth";
import { ProjectData } from "../../../types";

interface Column {
  id: "name" | "status" | "owner" | "created_at";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 170,
  },
  { id: "status", label: "Status", minWidth: 50 },
  {
    id: "owner",
    label: "Owner",
    minWidth: 250,
    align: "right",
  },
  {
    id: "created_at",
    label: "Created at",
    minWidth: 170,
    align: "right",
  },
];

interface Data {
  name: string;
  status: string;
  owner: string;
  created_at: string;
}

const Projects = () => {
  const [rows, setRows] = useState<Data[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getProjects = async () => {
      const projectsCollected: Data[] = [];
      const projectsData = await authRequest().get("/project");
      await Promise.all(
        projectsData.data.map(async (projectData: ProjectData) => {
          const { creator } = projectData;
          const ownerData = await authRequest().get(`/user/${creator}`);
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
    <>
      <Typography variant="h2" className="page-title">
        Your projects:
      </Typography>
      <Paper className="projects-list">
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    component={Link}
                    to={`/project/${row.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default Projects;
