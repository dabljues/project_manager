import styled from "styled-components/macro";
import { UserData } from "types";

import { Avatar, Typography } from "@material-ui/core";

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const UserAvatar = styled(Avatar)`
  margin-left: 0.75rem;
`;

const renderUser = (user: UserData) => (
  <UserInfo>
    <Typography>
      {user.firstName} {user.lastName}
    </Typography>
    <UserAvatar src={user.avatar} />
  </UserInfo>
);

export default renderUser;
