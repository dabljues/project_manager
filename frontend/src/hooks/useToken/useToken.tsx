import axios from "axios";

// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

const baseURL = "http://127.0.0.1:8000/api/";

export const decodeJWT = (token: string): Record<string, string> =>
  jwt_decode(token);

export const axiosInstance = () =>
  axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      Authorization: localStorage.getItem("access_token")
        ? `JWT ${localStorage.getItem("access_token")}`
        : null,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    // params: {
    //   user: localStorage.getItem("user_id")
    //     ? localStorage.getItem("user_id")
    //     : null,
    // },
  });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;

//     // Prevent infinite loops
//     if (
//       error.response.status === 401 &&
//       originalRequest.url === `${baseURL}token/refresh/`
//     ) {
//       window.location.href = "/login/";
//       return Promise.reject(error);
//     }
//     if (
//       error.response.status === 401 &&
//       error.response.statusText === "Unauthorized"
//     ) {
//       const refreshToken = localStorage.getItem("refresh_token");

//       if (refreshToken) {
//         const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

//         // exp date in token is expressed in seconds, while now() returns milliseconds:
//         const now = Math.ceil(Date.now() / 1000);

//         if (tokenParts.exp > now) {
//           return axiosInstance
//             .post("/token/refresh/", { refresh: refreshToken })
//             .then((response) => {
//               localStorage.setItem("access_token", response.data.access);
//               localStorage.setItem("refresh_token", response.data.refresh);

//               axiosInstance.defaults.headers.Authorization = `JWT ${response.data.access}`;
//               originalRequest.headers.Authorization = `JWT ${response.data.access}`;

//               return axiosInstance(originalRequest);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }
//         console.log("Refresh token is expired", tokenParts.exp, now);
//       } else {
//         console.log("Refresh token not available.");
//       }
//     }

//     // specific error handling done elsewhere
//     return Promise.reject(error);
//   }
// );

export type UserToken = {
  access: string;
  refresh: string;
};

export const getAccessToken = () => {
  const tokenString = localStorage.getItem("access_token");
  if (tokenString == null) {
    return null;
  }
  return String(tokenString);
};

export const getRefreshToken = () => {
  const tokenString = localStorage.getItem("refresh_token");
  if (tokenString == null) {
    return null;
  }
  return String(tokenString);
};

export const setToken = (userToken: UserToken) => {
  localStorage.setItem("access)token", JSON.stringify(userToken));
};

export const isAuthenticated = () => {
  // TODO: Check if token expired etc.
  const token = getAccessToken();
  return token != null;
};
