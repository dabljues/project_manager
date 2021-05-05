import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { axiosInstance } from "../../hooks/useToken";
import PageHeader from "../PageHeader";

interface UserData {
  id: string;
  // eslint-disable-next-line camelcase
  first_name: string;
  // eslint-disable-next-line camelcase
  last_name: string;
  email: string;
}

const HomePage = () => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  useEffect(() => {
    const c = axiosInstance();
    const getUser = async () => {
      const response = await c.get("user");
      console.log(response.data);
      setUserData(response.data);
    };
    getUser();
  }, []);
  return (
    <div className="box">
      <PageHeader />
      <div className="page">
        <Typography variant="h6">Hi, {userData?.first_name}</Typography>
      </div>
    </div>
  );
};

export default HomePage;
