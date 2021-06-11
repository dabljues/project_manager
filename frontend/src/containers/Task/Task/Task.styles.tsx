import {
  ProjectEntity,
  ProjectEntityHeader,
  ProjectEntityIcon,
  ProjectEntityInfo,
  ProjectEntityName,
} from "components/shared/ProjectEntity";
import styled from "styled-components";

import AssignmentIcon from "@material-ui/icons/Assignment";

const Task = styled.div`
  ${ProjectEntity}
`;
const TaskHeader = styled.div`
  ${ProjectEntityHeader}
`;
const TaskIcon = styled(AssignmentIcon)`
  ${ProjectEntityIcon}
  color: white;
`;
const TaskName = styled.span`
  ${ProjectEntityName}
`;
const TaskInfo = styled.div`
  ${ProjectEntityInfo}
`;

export { Task, TaskHeader, TaskIcon, TaskInfo, TaskName };
