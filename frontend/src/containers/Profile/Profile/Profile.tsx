import "./Profile.scss";

import Spinner from "components/shared/Spinner";
import { useEffect, useState } from "react";

import {
  Avatar,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EmailIcon from "@material-ui/icons/Email";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import PhoneIcon from "@material-ui/icons/Phone";

import { getCurrentUser } from "../../../api/auth";
import ChangeAvatar from "../../../components/Profile/ChangeAvatar";
import ChangePassword from "../../../components/Profile/ChangePassword";
import { UserData } from "../../../types";
import { ProfileInfoRow, UserStatsTile } from "./utils";

const useStyles = makeStyles(() =>
  createStyles({
    avatarText: {
      mixBlendMode: "difference",
      color: "brown",
    },
  })
);

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
      if (user) {
        setCurrentUser(user);
        setEmail(user.email);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setAvatar(user.avatar);
      }
    };
    if (isMounted) {
      getUser();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  if (currentUser === null) {
    return <Spinner />;
  }

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
            <ProfileInfoRow name="First name" content={firstName} />
            <ProfileInfoRow name="Last name" content={lastName} />
            <ProfileInfoRow
              name={{ icon: <EmailIcon />, tooltip: "E-mail" }}
              content={email}
            />
            <ProfileInfoRow
              name={{ icon: <PhoneIcon />, tooltip: "Phone number" }}
              content="+48 123 456 789"
            />
            <ProfileInfoRow name="Position" content="Software engineer" />
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
