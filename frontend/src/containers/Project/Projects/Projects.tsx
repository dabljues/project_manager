import "./Projects.scss";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { authRequest } from "../../../api/auth";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getProjects = async () => {
      const response = await authRequest().get("/project");
      setProjects(response.data);
    };
    getProjects();
  }, []);

  return (
    <div>
      <p>Projects here</p>
    </div>
  );
};

export default Projects;
