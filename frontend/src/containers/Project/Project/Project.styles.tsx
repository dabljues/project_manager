import {
  ProjectEntity,
  ProjectEntityHeader,
  ProjectEntityIcon,
  ProjectEntityInfo,
  ProjectEntityName,
} from "components/shared/ProjectEntity";
import styled from "styled-components";

import GroupWorkIcon from "@material-ui/icons/GroupWork";

const Project = styled.div`
  ${ProjectEntity}
`;
const ProjectHeader = styled.div`
  ${ProjectEntityHeader}
`;

const ProjectIcon = styled(GroupWorkIcon)`
  ${ProjectEntityIcon}
  color: var(--project-color);
`;

const ProjectName = styled.span`
  ${ProjectEntityName}
`;

const ProjectInfo = styled.div`
  ${ProjectEntityInfo}
`;

const ProjectViews = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  button + button {
    margin-left: 200px !important;
  }
`;
export {
  Project,
  ProjectIcon,
  ProjectInfo,
  ProjectHeader,
  ProjectName,
  ProjectViews,
};
