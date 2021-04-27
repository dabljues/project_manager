export type UserToken = {
  token: string;
};

export const getToken = () => {
  const tokenString = localStorage.getItem("token");
  if (tokenString == null) {
    return null;
  }
  const userToken = JSON.parse(tokenString);
  return String(userToken?.token);
};

export const setToken = (userToken: UserToken) => {
  localStorage.setItem("token", JSON.stringify(userToken));
};

const isAuthenticated = () => {
  const token = getToken();
  return token != null;
};

export default isAuthenticated;
