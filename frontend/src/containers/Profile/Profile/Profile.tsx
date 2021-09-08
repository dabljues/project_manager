import { getCurrentUser } from "api/auth";
import ChangeAvatar from "components/Profile/ChangeAvatar";
import ChangePassword from "components/Profile/ChangePassword";
import Spinner from "components/shared/Spinner";
import { ProjectIcon, TaskIcons } from "models";
import { useEffect, useState } from "react";
import { UserData } from "types";

import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

import * as S from "./Profile.styles";
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
    <S.ProfileWrapper>
      <S.ProfileBasicInfo>
        <S.ProfileAvatar src={avatar} />
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
      </S.ProfileBasicInfo>
      <S.ProfileDetailedInfo>
        <S.ProfileEdit>
          <S.Rows>
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
          </S.Rows>

          <S.EditMenu>
            <ChangeAvatar userData={currentUser} />
            <ChangePassword userData={currentUser} />
          </S.EditMenu>
        </S.ProfileEdit>
        <S.UserStats>
          <Grid container item>
            <UserStatsTile
              icon={<ProjectIcon />}
              name="Projects"
              subheader="Participating in"
              content={2}
            />
            <UserStatsTile
              icon={<TaskIcons.Task />}
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
        </S.UserStats>
      </S.ProfileDetailedInfo>
    </S.ProfileWrapper>
  );
};

export default Profile;
