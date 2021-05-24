import axios, { AxiosInstance } from "axios";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

import { UserData } from "../../types";
import toCamelCase from "../utils";

const baseURL = "http://127.0.0.1:8000/api/";

export const decodeJWT = (token: string): Record<string, string> =>
  jwt_decode(token);

export type UserToken = {
  access: string;
  refresh: string;
};

export const getAccessToken = (): string | null => {
  const accessToken = localStorage.getItem("access_token");
  return accessToken;
};

export const getRefreshToken = (): string | null => {
  const refreshToken = localStorage.getItem("refresh_token");
  return refreshToken;
};

const getAccessTokenExp = (): string | null => {
  const tokenExpirationDate = localStorage.getItem("access_token_exp");
  return tokenExpirationDate;
};

const getRefreshTokenExp = (): string | null => {
  const tokenExpirationDate = localStorage.getItem("refresh_token_exp");
  return tokenExpirationDate;
};

export const setToken = (token: UserToken) => {
  localStorage.setItem("access_token", token.access);
  localStorage.setItem("refresh_token", token.refresh);
  const decodedAccessToken = decodeJWT(token.access);
  const decodedRefreshToken = decodeJWT(token.refresh);
  localStorage.setItem("access_token_exp", decodedAccessToken.exp);
  localStorage.setItem("refresh_token_exp", decodedRefreshToken.exp);
};

const applyInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(
    async (request) => {
      const accessTokenExp = getAccessTokenExp();
      const refreshTokenExp = getRefreshTokenExp();
      if (accessTokenExp === null || refreshTokenExp === null) {
        return request;
      }
      const accessTokenExpDate = new Date(parseInt(accessTokenExp, 10) * 1000);
      const refreshTokenExpDate = new Date(
        parseInt(refreshTokenExp, 10) * 1000
      );
      const currentDate = new Date();
      // It's the same as in refreshTokenExpired, but it has to be here because
      // refreshTokenExpired only handles component switching (routing), not some
      // lonely API calls on the same component
      if (currentDate > refreshTokenExpDate) {
        const history = useHistory();
        history.push("/login");
        localStorage.clear();
        return Promise.reject();
      }
      if (currentDate > accessTokenExpDate) {
        const refreshToken = getRefreshToken();

        if (refreshToken) {
          await axios
            .post("/api/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              setToken(response.data);
              // eslint-disable-next-line no-param-reassign
              axiosInstance.defaults.headers.Authorization = `JWT ${response.data.access}`;
              request.headers.Authorization = `JWT ${response.data.access}`;
            })
            .catch(() => {});
          return request;
        }
      }
      return request;
    },
    (error) => Promise.reject(error)
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      //   response.data = toCamelCase(response.data);
      const x = 2 + 2;
      return response;
    },
    (error) => Promise.reject(error)
  );
  return axiosInstance;
};

export const authRequest = () => {
  const axiosInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      Authorization: getAccessToken() ? `JWT ${getAccessToken()}` : null,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
  return applyInterceptors(axiosInstance);
};

export const setCurrentUser = (user: UserData) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getCurrentUser = async (): UserData => {
  const userResponse = await authRequest()
    .get("/user/current")
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  if (userResponse) {
    const user = userResponse.data;
    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      avatar: user.avatar,
    };
    setCurrentUser(userData);
    return userData;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  return accessToken !== null && refreshToken != null;
};

export const refreshTokenExpired = (): boolean => {
  const refreshTokenExp = getRefreshTokenExp();
  if (refreshTokenExp === null) {
    return false;
  }
  const refreshTokenExpDate = new Date(parseInt(refreshTokenExp, 10) * 1000);
  const currentDate = new Date();
  if (currentDate > refreshTokenExpDate) {
    localStorage.clear();
    return true;
  }
  return false;
};
