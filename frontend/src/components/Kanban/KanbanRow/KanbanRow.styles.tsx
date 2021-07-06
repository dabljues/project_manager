import styled from "styled-components/macro";

import {
  Avatar,
  createStyles,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
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

const AccordionSummary = withStyles({
  content: {
    display: "flex",
    alignItems: "center",
  },
})(MuiAccordionSummary);

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      display: "flex",
      alignItems: "center",
    },
  })
);

const KanbanRowAvatar = styled(Avatar)`
  margin-left: 1rem;
`;

export { Accordion, AccordionSummary, KanbanRowAvatar };
