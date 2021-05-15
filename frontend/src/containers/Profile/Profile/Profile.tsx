import { Grid, Typography, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../api/auth";
import { UserData } from "../../../types";
import "./Profile.scss";

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
    const getUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAvatar(user.avatar);
    };
    getUser();
  });

  return (
    <div className="profile-box">
      <Typography variant="h3" className="profile-information-title">
        Profile information
      </Typography>
      <Grid>
        <Grid container item xs={12}>
          <ProfileInfoRow name="First name" content={firstName} />
          <ProfileInfoRow name="Last name" content={lastName} />
          <ProfileInfoRow name="Email" content={email} />
          <ProfileInfoRow name="Avatar" content={avatar} />
        </Grid>
      </Grid>
      <div className="profile-edit-menu">
        <Button color="primary" variant="contained">
          Change profile info
        </Button>
        <Button color="primary" variant="contained">
          Change password
        </Button>
      </div>
    </div>
  );
};

export default Profile;
