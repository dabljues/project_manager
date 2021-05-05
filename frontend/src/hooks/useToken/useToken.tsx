import axios, { AxiosInstance } from "axios";

// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

const baseURL = "http://127.0.0.1:8000/api/";

export const decodeJWT = (token: string): Record<string, string> =>
  jwt_decode(token);

export type UserToken = {
  access: string;
  refresh: string;
};

const applyInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;

      // Prevent infinite loops
      if (
        error.response.status === 401 &&
        originalRequest.url === `${baseURL}token/refresh/`
      ) {
        window.location.href = "/login/";
        return Promise.reject(error);
      }
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          const parsedToken = decodeJWT(refreshToken);

          if (parseInt(parsedToken.exp, 10) * 1000 > Date.now()) {
            return axiosInstance
              .post("/token/refresh/", { refresh: refreshToken })
              .then((response) => {
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);

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
      Authorization: localStorage.getItem("access_token")
        ? `JWT ${localStorage.getItem("access_token")}`
        : null,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
  return applyInterceptors(axiosInstance);
};
