import { Typography } from "@material-ui/core";

import { getCurrentUser } from "../../hooks/auth";
import PageHeader from "../PageHeader";

const HomePage = () => {
  const currentUser = getCurrentUser();
  return (
    <div className="box">
      <PageHeader />
      <div className="page">
        <Typography variant="h1">Hi, {currentUser.first_name}</Typography>
      </div>
    </div>
  );
};

export default HomePage;
