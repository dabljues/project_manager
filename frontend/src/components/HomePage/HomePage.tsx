import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { axiosInstance } from "../../hooks/useToken";
import PageHeader from "../PageHeader";
import UserData from "../../shared/interfaces";

const HomePage = () => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  useEffect(() => {
    const c = axiosInstance();
    const getUser = async () => {
      const response = await c.get("user/current");
      setUserData(response.data);
    };
    getUser();
  }, []);
  return (
    <div className="box">
      <PageHeader currentUser={userData} />
      <div className="page">
        <Typography variant="h1">Hi, {userData?.first_name}</Typography>
      </div>
    </div>
  );
};

export default HomePage;
