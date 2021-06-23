import "./StatusRow.scss";

import React from "react";

import { createStyles, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    operOrDone: {
      color: "green",
      flex: 1,
    },
    closedOrRejected: {
      color: "red",
      flex: 1,
    },
    other: {
      flex: 1,
    },
  })
);

interface StatusRowProps {
  status: string;
}

const StatusRow = (props: React.PropsWithChildren<StatusRowProps>) => {
  const { status, children } = props;
  const classes = useStyles();

  let statusClass: string = "";
  if (status === "Open" || status === "Done") {
    statusClass = classes.operOrDone;
  } else if (status === "Closed" || status === "Rejected") {
    statusClass = classes.closedOrRejected;
  } else {
    statusClass = classes.other;
  }

  return (
    <div className="status-row">
      <Typography variant="h4" className={statusClass}>
        {status}
      </Typography>
      <div className="action-buttons">{children}</div>
    </div>
  );
};

export default StatusRow;
