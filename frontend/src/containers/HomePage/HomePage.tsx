import { useEffect, useState } from "react";

import { Typography } from "@material-ui/core";

import { getCurrentUser } from "../../api/auth";
import { UserData } from "../../types";

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  useEffect(() => {
    const getUser = async () => {
      console.log("Getting the user from Home Page");
      setCurrentUser(await getCurrentUser());
    };
    getUser();
  }, []);
  return (
    <div className="box">
      <div className="page">
        <Typography variant="h1">Hi, {currentUser?.firstName}</Typography>
      </div>
    </div>
  );
};

export default HomePage;
