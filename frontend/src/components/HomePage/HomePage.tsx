import { Typography } from "@material-ui/core";

import { getCurrentUser } from "../../hooks/auth";

const HomePage = () => {
  const currentUser = getCurrentUser();
  return (
    <div className="box">
      <div className="page">
        <Typography variant="h1">Hi, {currentUser.first_name}</Typography>
      </div>
    </div>
  );
};

export default HomePage;
