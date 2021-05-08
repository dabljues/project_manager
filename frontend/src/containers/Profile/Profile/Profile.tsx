import { Grid, Typography } from "@material-ui/core";
import { getCurrentUser } from "../../../api/auth";
import "./Profile.scss";

const Profile = () => {
  const { email, first_name, last_name, avatar } = getCurrentUser();

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
              {first_name}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={6}>
              {last_name}
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
