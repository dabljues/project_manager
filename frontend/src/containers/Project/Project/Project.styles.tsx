import ProjectEntity from "components/shared/ProjectEntity/ProjectEntity/ProjectEntity";
import styled from "styled-components";

import GroupWorkIcon from "@material-ui/icons/GroupWork";

const Project = styled(ProjectEntity)``;

// const ProjectIcon = styled(GroupWorkIcon)`
//   ${ProjectEntityIcon}
//   color: var(--project-color);
// `;

const ProjectViews = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
`;
export { Project, ProjectViews };
