import { Dictionary, IconInfo } from "types";

import AssignmentIcon from "@material-ui/icons/Assignment";
import BugReportIcon from "@material-ui/icons/BugReport";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

const TaskTypes: Dictionary<string> = {
  Bug: "B",
  Improvement: "I",
  Task: "T",
};

const TaskIcons: Dictionary<IconInfo> = {
  Bug: { Icon: BugReportIcon, iconProps: { color: "error" } },
  Improvement: {
    Icon: DoubleArrowIcon,
    iconProps: { style: { color: "green" } },
  },
  Task: { Icon: AssignmentIcon, iconProps: { color: "primary" } },
};

export { TaskIcons, TaskTypes };
