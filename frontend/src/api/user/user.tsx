import { authRequest } from "api/auth";
import { UserData } from "types";

export const getUser = async (
  userId: number | string
): Promise<UserData | null> => {
  const userResponse = await authRequest()
    .get(`/user/${userId}`)
    .then((response) => response);
  if (userResponse) {
    const user = userResponse.data;
    return user;
  }
  return null;
};

export default getUser;
