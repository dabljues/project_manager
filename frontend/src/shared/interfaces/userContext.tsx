import { createContext } from "react";
import { UserData } from ".";

export type UserContextState = {
  user: UserData;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: UserData) => void;
};

export const defaultUserContext: UserContextState = {
  user: { id: 0, first_name: "", last_name: "", email: "" },
  setUser: () => {},
};

export const UserContext = createContext<UserContextState>(defaultUserContext);

export default UserContext;
