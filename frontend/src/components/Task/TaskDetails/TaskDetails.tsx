import DetailEntry from "components/shared/ProjectEntity/DetailEntry";
import { TaskData } from "types";

import { Grid } from "@material-ui/core";

const TaskDetails = ({ task }: { task: TaskData }) => (
  <Grid container spacing={2}>
    <DetailEntry
      key="haha1"
      label="Title"
      content={task.title}
      editName="Change title"
    />
    <DetailEntry
      key="haha2"
      label="Type"
      content={task.type}
      editName="Change type"
    />
    <DetailEntry
      key="haha3"
      label="Creator"
      content={`${task.creator.firstName} ${task.creator.lastName}`}
      editName="Transfer ownership"
    />
    <DetailEntry
      key="haha4"
      label="Assignee"
      content={`${task.assignee.firstName} ${task.assignee.lastName}`}
      editName="Assign"
    />
    <DetailEntry
      key="haha5"
      label="Created"
      content={task.createdAt}
      editName="Delete task"
    />
  </Grid>
);

export default TaskDetails;
