import styled from "styled-components";
import {
  ProjectEntity,
  ProjectEntityInfo,
  ProjectEntityName,
} from "components/shared/ProjectEntity";

const Project = styled.div`
  ${ProjectEntity}
`;

const ProjectInfo = styled.div`
  ${ProjectEntityInfo}
`;

const ProjectName = styled.div`
  ${ProjectEntityName}
`;

const ProjectViews = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  button + button {
    margin-left: 200px !important;
  }
`;
export { Project, ProjectInfo, ProjectName, ProjectViews };
