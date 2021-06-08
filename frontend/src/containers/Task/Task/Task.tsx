import { RouteComponentProps, withRouter } from "react-router-dom";
import "./Task.scss";

interface TaskParams {
  taskName: string;
}

interface TaskProps extends RouteComponentProps<TaskParams> {}

const Task = ({ match }: TaskProps) => {
  const { taskName } = match.params;
  return <div>{taskName}</div>;
};

export default withRouter(Task);
