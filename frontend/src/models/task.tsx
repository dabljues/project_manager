import { Dictionary } from "types";

import AssignmentIcon from "@material-ui/icons/Assignment";
import BugReportIcon from "@material-ui/icons/BugReport";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import React from "react";

const TaskTypes: Dictionary<string> = {
  Bug: "B",
  Improvement: "I",
  Task: "T",
};

const TaskIcons: Dictionary<React.ReactNode> = {
  Bug: <BugReportIcon style={{ color: "red" }} />,
  Improvement: <DoubleArrowIcon style={{ color: "green" }} />,
  Task: <AssignmentIcon color="primary" />,
};

export { TaskIcons, TaskTypes };
