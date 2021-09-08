import styled from "styled-components/macro";

import { Avatar, Typography, withStyles } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";

const KanbanRowHeader = styled(Typography)<{ expanded: boolean }>`
  color: ${(props) => (props.expanded ? "white" : "black")};
`;

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    minWidth: "300px",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const KanbanRowAvatar = styled(Avatar)`
  margin-left: 1rem;
`;

export { Accordion, KanbanRowAvatar, KanbanRowHeader };
