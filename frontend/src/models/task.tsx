import { Dictionary } from "types";
import BugReportIcon from "@material-ui/icons/BugReport";
import AssignmentIcon from "@material-ui/icons/Assignment";

const TaskTypes: Dictionary<string> = {
  Bug: "B",
  Improvement: "I",
  Task: "T",
};

const TaskIcons: Dictionary<JSX.Element> = {
  Bug: BugReportIcon,
  Improvement: AssignmentIcon,
  Task: AssignmentIcon,
};

export { TaskIcons, TaskTypes };
