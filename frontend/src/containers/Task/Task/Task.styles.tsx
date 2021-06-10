import styled from "styled-components";
import {
  ProjectEntity,
  ProjectEntityInfo,
  ProjectEntityName,
} from "components/shared/ProjectEntity";

const Task = styled.div`
  ${ProjectEntity}
`;

const TaskInfo = styled.div`
  ${ProjectEntityInfo}
`;

const TaskName = styled.div`
  ${ProjectEntityName}
`;
export { Task, TaskInfo, TaskName };
