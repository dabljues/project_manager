import "./Profile.scss";

import { useEffect, useState } from "react";

import { Avatar, Button, Grid, Typography } from "@material-ui/core";

import { getCurrentUser } from "../../../api/auth";
import ChangePassword from "../../../components/Profile/ChangePassword";
import EditProfile from "../../../components/Profile/EditProfile";
import { UserData } from "../../../types";
import ChangeAvatar from "../../../components/Profile/ChangeAvatar";

interface ProfileInfoTileProps {
  name: string;
  content: string | number;
}

const ProfileInfoTile = (props: ProfileInfoTileProps) => {
  const { name, content } = props;
  return (
    <Grid item xs className="tile">
      <div className="name">{name}</div>
      <div className="content">{content}</div>
    </Grid>
  );
};

const Profile = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");

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
        <Typography variant="h5" color="textPrimary">
          {firstName} {lastName}
        </Typography>
        <Typography>{email}</Typography>
      </div>
      <div className="profile-detailed-info">
        <Grid container>
          <Grid container item className="row">
            <ProfileInfoTile name="Phone number" content="+48 123 456 789" />
            <ProfileInfoTile name="Position" content="Software engineer" />
            <ProfileInfoTile name="Empty" content="empty" />
          </Grid>
          <Grid container item className="row">
            <ProfileInfoTile name="Projects" content={2} />
            <ProfileInfoTile name="Tasks" content={10} />
            <ProfileInfoTile name="Tasks done" content={3} />
          </Grid>
        </Grid>

        <div className="edit-menu">
          <EditProfile userData={currentUser} />
          <ChangePassword userData={currentUser} />
          <ChangeAvatar userData={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
