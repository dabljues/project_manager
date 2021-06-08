import "./DetailEntry.scss";

import {
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    infoLabel: {
      fontWeight: "bold",
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
          <Typography variant="h5" className={classes.infoLabel}>
            {name}
          </Typography>
        </div>
        <Typography variant="h6">{content}</Typography>
      </div>
      <div className="edit">{editButton}</div>
    </div>
  );
};

export default DetailEntry;
