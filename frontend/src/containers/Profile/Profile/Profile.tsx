import "./Profile.scss";

import { useEffect, useState } from "react";

import { Avatar, Button, Grid, Typography } from "@material-ui/core";

import { getCurrentUser } from "../../../api/auth";
import ChangePassword from "../../../components/Profile/ChangePassword";
import EditProfile from "../../../components/Profile/EditProfile";
import { UserData } from "../../../types";
import ChangeAvatar from "../../../components/Profile/ChangeAvatar";

interface ProfileInfoRowProps {
  name: string;
  content: string;
}

const ProfileInfoRow = (props: ProfileInfoRowProps) => {
  const { name, content } = props;
  return (
    <Grid container item xs={12} className="profile-entry">
      <Grid item xs={1} className="profile-entry-name">
        {name}
      </Grid>
      <Grid item>{content}</Grid>
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
      console.log("Getting the user from Profile page");
      getUser();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="profile-box">
      <Typography variant="h3" className="profile-information-title">
        Profile information
      </Typography>
      <Avatar src={currentUser?.avatar} className="profile-avatar" />
      <Grid>
        <Grid container item xs={12}>
          <ProfileInfoRow name="First name" content={firstName} />
          <ProfileInfoRow name="Last name" content={lastName} />
          <ProfileInfoRow name="Email" content={email} />
        </Grid>
      </Grid>
      <div className="profile-edit-menu">
        <EditProfile userData={currentUser} />
        <ChangePassword userData={currentUser} />
        <ChangeAvatar userData={currentUser} />
      </div>
    </div>
  );
};

export default Profile;
