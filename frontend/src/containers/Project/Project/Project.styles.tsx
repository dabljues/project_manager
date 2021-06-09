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
`;

const ProjectViewsButtons = styled.div`
  display: flex;
  button + button {
    margin-left: 100px !important;
  }
`;
export { Project, ProjectInfo, ProjectName, ProjectViews, ProjectViewsButtons };
