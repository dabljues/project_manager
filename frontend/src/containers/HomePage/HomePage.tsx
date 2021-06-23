import CenteredDiv from "components/shared/CenteredDiv";
import { useEffect, useState } from "react";

import { Typography } from "@material-ui/core";

import { getCurrentUser } from "../../api/auth";
import { UserData } from "../../types";

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  useEffect(() => {
    const getUser = async () => {
      setCurrentUser(await getCurrentUser());
    };
    getUser();
  }, []);
  return (
    <CenteredDiv>
      <Typography variant="h1">Hi, {currentUser?.firstName}</Typography>
    </CenteredDiv>
  );
};

export default HomePage;
