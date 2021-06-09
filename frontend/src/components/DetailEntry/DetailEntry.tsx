import "./DetailEntry.scss";

import {
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";

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
  content: JSX.Element | string;
  editButton: JSX.Element;
}

const DetailEntry = (props: DetailEntryProps) => {
  const { name, content, editButton } = props;
  const classes = useStyles();

  return (
    <div className="detail-entry">
      <div className="info">
        <div className="label">
          <Typography className={classes.detailLabel}>{name}</Typography>
        </div>
        <Typography className={classes.detailContent}>{content}</Typography>
      </div>
      <div className="edit">{editButton}</div>
    </div>
  );
};

export default DetailEntry;
