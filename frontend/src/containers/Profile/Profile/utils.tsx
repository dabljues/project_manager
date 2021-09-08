import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";

import * as S from "./Profile.styles";

const useStyles = makeStyles((theme: Theme) => {
  const fontSize = 15;
  const nameWidth = "100px";

  return createStyles({
    avatarText: {
      mixBlendMode: "difference",
      color: "brown",
    },
    input: {
      marginLeft: theme.spacing(1),
      height: 20,
      width: "300px",
      fontSize,
    },
    label: {
      fontSize,
      fontWeight: "bold",
      width: nameWidth,
      textAlign: "right",
    },
    icon: {
      display: "flex",
      width: nameWidth,
      justifyContent: "flex-end",
    },
  });
});

interface ProfileInfoRowIcon {
  icon: JSX.Element;
  tooltip: string;
}
interface ProfileInfoRowProps {
  name: string | ProfileInfoRowIcon;
  content: string | number;
}

interface UserStatsTileProps {
  icon: JSX.Element;
  name: string;
  content: string | number;
  subheader: string;
}

const ProfileInfoRow = (props: ProfileInfoRowProps) => {
  const { name, content } = props;
  const classes = useStyles();
  const formattedName =
    typeof name === "string" ? (
      <Typography className={classes.label}>{name}</Typography>
    ) : (
      <div className={classes.icon}>
        <Tooltip title={name.tooltip} placement="left-start">
          {name.icon}
        </Tooltip>
      </div>
    );
  return (
    <S.ProfileInfoRow>
      {formattedName}
      <TextField
        variant="outlined"
        InputProps={{
          className: classes.input,
        }}
        defaultValue={content}
      />
    </S.ProfileInfoRow>
  );
};

const UserStatsTile = (props: UserStatsTileProps) => {
  const { icon, name, content, subheader } = props;
  return (
    <S.Tile item xs>
      <Card>
        <CardHeader
          title={
            <div>
              {icon}
              <Typography>{name}</Typography>
            </div>
          }
          subheader={subheader}
        />
        <CardContent>
          <Typography>{content}</Typography>
        </CardContent>
      </Card>
    </S.Tile>
  );
};

export { ProfileInfoRow, UserStatsTile };
