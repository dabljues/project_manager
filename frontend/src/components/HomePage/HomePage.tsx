import { useContext, useEffect } from "react";

import { Typography } from "@material-ui/core";

import { axiosInstance } from "../../hooks/useToken";
import { UserContext } from "../../shared/interfaces";
import PageHeader from "../PageHeader";

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const c = axiosInstance();
    const getUser = async () => {
      const response = await c.get("user/current");
      setUser(response.data);
    };
    getUser();
  }, []);
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
