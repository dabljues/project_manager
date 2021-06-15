import { Row } from "antd";
import DetailEntry from "components/shared/AD/ProjectEntity/DetailEntry";
import { TaskData } from "types";

const TaskDetails = ({ task }: { task: TaskData }) => (
  <Row align="middle" gutter={16}>
    <DetailEntry label="Title" content={task.title} editName="Change title" />
    <DetailEntry label="Type" content={task.type} editName="Change type" />
    <DetailEntry
      label="Creator"
      content={`${task.creator.firstName} ${task.creator.lastName}`}
      editName="Transfer ownership"
    />
    <DetailEntry
      label="Assignee"
      content={`${task.assignee.firstName} ${task.assignee.lastName}`}
      editName="Assign"
    />
    <DetailEntry
      label="Created"
      content={task.createdAt}
      editName="Delete task"
    />
  </Row>
);

export default TaskDetails;
