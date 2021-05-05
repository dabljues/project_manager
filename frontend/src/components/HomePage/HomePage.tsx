import { useContext } from "react";

import { Typography } from "@material-ui/core";

import { UserContext } from "../../shared/interfaces";
import PageHeader from "../PageHeader";

const HomePage = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="box">
      <PageHeader currentUser={user} />
      <div className="page">
        <Typography variant="h1">Hi, {user.first_name}</Typography>
      </div>
    </div>
  );
};

export default HomePage;
