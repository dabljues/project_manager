import { Button } from "@material-ui/core";
import task from "../../../types/task";
import StatusRow from "../../StatusRow";

interface TaskStatusProps {
  status: string;
}

const TaskStatus = (props: TaskStatusProps) => {
  const { status } = props;

  const mapping = {
    New: "New",
    "To do": "To do",
    "In progress": "In progress",
    "In review": "In review",
    Done: "Done",
    Close: "Rejected",
  };

  return (
    <StatusRow status={status}>
      {Object.keys(mapping).map((statusButtonName, index) => {
        if (statusButtonName === status) {
          return null;
        }
        return <Button variant="contained">{statusButtonName}</Button>;
      })}
    </StatusRow>
  );
};

export default TaskStatus;
