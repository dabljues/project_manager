import { UserData } from "types";

import {
  Avatar,
  ListItemAvatar,
  MenuItem,
  Typography,
} from "@material-ui/core";

const renderUserMenuItem = (user: UserData) => (
  <MenuItem value={user.id}>
    <ListItemAvatar>
      <Avatar src={user.avatar} />
    </ListItemAvatar>
    <Typography>
      {user.firstName} {user.lastName}
    </Typography>
  </MenuItem>
);

export default renderUserMenuItem;
