import "./Profile.scss";

import { useEffect, useState } from "react";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { getCurrentUser } from "../../../api/auth";
import ChangeAvatar from "../../../components/Profile/ChangeAvatar";
import ChangePassword from "../../../components/Profile/ChangePassword";
import { UserData } from "../../../types";

const useStyles = makeStyles((theme: Theme) => {
  const fontSize = 15;

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
      width: "120px",
      textAlign: "right",
    },
  });
});
interface ProfileInfoRowProps {
  label: string;
  content: string | number;
}

interface UserStatsTileProps {
  icon: JSX.Element;
  name: string;
  content: string | number;
  subheader: string;
}

const ProfileInfoRow = (props: ProfileInfoRowProps) => {
  const { label, content } = props;
  const classes = useStyles();
  return (
    <div className="row">
      <Typography className={classes.label}>{label}</Typography>
      <TextField
        variant="outlined"
        InputProps={{
          className: classes.input,
        }}
        defaultValue={content}
      />
    </div>
  );
};

const UserStatsTile = (props: UserStatsTileProps) => {
  const { icon, name, content, subheader } = props;
  return (
    <Grid item xs className="tile">
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
    </Grid>
  );
};

const Profile = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const classes = useStyles();

  useEffect(() => {
    let isMounted = true;
    const getUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAvatar(user.avatar);
    };
    if (isMounted) {
      getUser();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="profile-box">
      <div className="profile-basic-info">
        <Avatar src={avatar} className="avatar" />
        <Typography variant="h3" className={classes.avatarText}>
          {firstName} {lastName}
        </Typography>
        <Typography
          variant="overline"
          className={classes.avatarText}
          style={{ fontSize: "15px" }}
        >
          {email}
        </Typography>
      </div>
      <div className="profile-detailed-info">
        <div className="profile-edit">
          <div className="rows">
            <ProfileInfoRow label="First name" content={firstName} />
            <ProfileInfoRow label="Last name" content={lastName} />
            <ProfileInfoRow label="E-mail" content={email} />
            <ProfileInfoRow label="Phone number" content="+48 123 456 789" />
            <ProfileInfoRow label="Position" content="Software engineer" />
          </div>

          <div className="edit-menu">
            <ChangeAvatar userData={currentUser} />
            <ChangePassword userData={currentUser} />
          </div>
        </div>
        <div className="user-stats">
          <Grid container item className="info-grid">
            <UserStatsTile
              icon={<GroupWorkIcon style={{ color: "#cc3399" }} />}
              name="Projects"
              subheader="Participating in"
              content={2}
            />
            <UserStatsTile
              icon={<AssignmentIcon color="primary" />}
              name="Tasks"
              subheader="Assigned"
              content={10}
            />
            <UserStatsTile
              icon={<CheckCircleIcon style={{ color: "turquoise" }} />}
              name="Tasks"
              subheader="Completed"
              content={3}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Profile;
