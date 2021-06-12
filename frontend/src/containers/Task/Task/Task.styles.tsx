import {
  ProjectEntity,
  ProjectEntityHeader,
  ProjectEntityIcon,
  ProjectEntityInfo,
  ProjectEntityName,
} from "components/shared/ProjectEntity";
import styled from "styled-components";

import AssignmentIcon from "@material-ui/icons/Assignment";

const Task = styled(ProjectEntity)``;
const TaskHeader = styled(ProjectEntityHeader)``;
const TaskIcon = styled(AssignmentIcon)`
  ${ProjectEntityIcon}
  color: white;
`;
const TaskName = styled(ProjectEntityName)``;
const TaskInfo = styled(ProjectEntityInfo)``;

export { Task, TaskHeader, TaskIcon, TaskInfo, TaskName };
