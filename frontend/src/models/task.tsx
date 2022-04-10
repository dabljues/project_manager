import styled from "styled-components/macro";

import { Dictionary, IconInfo } from "types";

import AssignmentIcon from "@material-ui/icons/Assignment";
import BugReportIcon from "@material-ui/icons/BugReport";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import React from "react";

const TaskTypes: Dictionary<string> = {
  Bug: "B",
  Improvement: "I",
  Task: "T",
};

const TaskColors: Dictionary<string> = {
  Bug: "#cc0000",
  Improvement: "#009933",
  Task: "var(--primary-color)",
};

const BugIcon = styled(BugReportIcon)`
  color: ${TaskColors.Bug};
`;
const ImprovementIcon = styled(DoubleArrowIcon)`
  color: ${TaskColors.Improvement};
`;

const TaskIcon = styled(AssignmentIcon)`
  color: var(--primary-color);
`;

const TaskIcons: Dictionary<React.ComponentType> = {
  Bug: BugIcon,
  Improvement: ImprovementIcon,
  Task: TaskIcon,
};

export { TaskIcons, TaskTypes, TaskColors };
