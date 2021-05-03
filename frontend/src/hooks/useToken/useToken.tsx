export type UserToken = {
  access: string;
  refresh: string;
};

export const getToken = () => {
  const tokenString = localStorage.getItem("token");
  if (tokenString == null) {
    return null;
  }
  const userToken = JSON.parse(tokenString);
  return String(userToken?.access);
};

export const setToken = (userToken: UserToken) => {
  localStorage.setItem("token", JSON.stringify(userToken));
};

export const isAuthenticated = () => {
  // TODO: Check if token expired etc.
  const token = getToken();
  return token != null;
};
