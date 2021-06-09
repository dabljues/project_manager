import "./DetailEntry.scss";

import React from "react";

import { createStyles, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    detailLabel: {
      fontWeight: "bold",
      fontSize: 20,
    },
    detailContent: {
      fontSize: 18,
    },
  })
);

interface DetailEntryProps {
  name: string;
  editButton: JSX.Element;
}

const DetailEntry = (props: React.PropsWithChildren<DetailEntryProps>) => {
  const { name, editButton, children } = props;
  const classes = useStyles();

  return (
    <div className="detail-entry">
      <div className="info">
        <div className="label">
          <Typography className={classes.detailLabel}>{name}</Typography>
        </div>
        <div className="content">{children}</div>
      </div>
      <div className="edit">{editButton}</div>
    </div>
  );
};

export default DetailEntry;
