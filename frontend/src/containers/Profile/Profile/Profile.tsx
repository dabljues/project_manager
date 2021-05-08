import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../api/auth";
import { UserData } from "../../../types";
import "./Profile.scss";

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
  }, []);

  return (
    <div className="profile-box">
      <div className="profile-info">
        <p>avatar</p>
        <Typography>Name</Typography>
        <Typography>Email</Typography>
      </div>
      <div>
        <Typography variant="h3">Profile information</Typography>
        <Grid>
          <Grid container item xs={12}>
            <Grid item xs={6}>
              {email}
            </Grid>
            <Grid item xs={6}>
              {firstName}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={6}>
              {lastName}
            </Grid>
            <Grid item xs={6}>
              {avatar}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
