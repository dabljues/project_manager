import axios, { AxiosInstance } from "axios";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

import { UserData } from "../../shared/interfaces";

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

export const setToken = (token: UserToken) => {
  localStorage.setItem("access_token", token.access);
  localStorage.setItem("refresh_token", token.refresh);
};

const applyInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        originalRequest.url === `${baseURL}token/refresh/`
      ) {
        window.location.href = "/login/";
        localStorage.clear();
        return Promise.reject(error);
      }
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        const refreshToken = getRefreshToken();

        if (refreshToken) {
          const parsedToken = decodeJWT(refreshToken);

          if (parseInt(parsedToken.exp, 10) * 1000 > Date.now()) {
            return axiosInstance
              .post("/token/refresh/", { refresh: refreshToken })
              .then((response) => {
                setToken(response.data);

                // eslint-disable-next-line no-param-reassign
                axiosInstance.defaults.headers.Authorization = `JWT ${response.data.access}`;
                originalRequest.headers.Authorization = `JWT ${response.data.access}`;

                return axiosInstance(originalRequest);
              })
              .catch(() => {});
          }
        }
      }
      return Promise.reject(error);
    }
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

export const getCurrentUser = (fetchIfNone: boolean = true): UserData => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const userJSON = JSON.parse(userString);
    return userJSON;
  }
  if (fetchIfNone) {
    const authCommunicator = authRequest();
    const user = authCommunicator.get("/user/current");
    setCurrentUser(user);
    return user;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  return accessToken !== null && refreshToken !== null;
};
