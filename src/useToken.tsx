import { useState } from "react";

export type UserToken = {
  token: string;
};

// eslint-disable-next-line no-unused-vars
export type SetToken = (userToken: UserToken) => void;

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    if (tokenString == null) {
      return null;
    }
    const userToken = JSON.parse(tokenString);
    return String(userToken?.token);
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: UserToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    token,
    setToken: saveToken,
  };
};

export default useToken;
