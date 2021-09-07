import ProjectEntity from "components/shared/ProjectEntity/ProjectEntity";
import styled from "styled-components";

import AssignmentIcon from "@material-ui/icons/Assignment";
import { TaskIcons } from "models";

const Task = styled(ProjectEntity)``;
// const TaskHeader = styled(ProjectEntityHeader)``;
// const TaskIcon = styled(AssignmentIcon)`
//   ${ProjectEntityIcon}
//   color: white;
// `;
// const TaskName = styled(ProjectEntityName)``;
// const TaskInfo = styled(ProjectEntityInfo)``;
const TaskIcon = styled(TaskIcons.Task)`
  color: white;
`;

export { Task, TaskIcon };
