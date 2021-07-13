import React, { useEffect, useState } from "react";
import UserData from "types/userData";

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemAvatar,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

interface ChangeUserProps {
  userType: "assignee" | "owner";
  currentUser: UserData;
  getAvailableUsers: () => Promise<UserData[]>;
  onSubmit: (value: number) => Promise<void>;
}

const ChangeUser = (props: ChangeUserProps) => {
  const { userType, currentUser, getAvailableUsers, onSubmit } = props;
  const [open, setOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(currentUser.id);
  const [availableUsers, setAvailableUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await getAvailableUsers();
      setAvailableUsers(users);
    };
    getUsers();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (currentUserId === currentUser.id) {
      return;
    }
    onSubmit(currentUserId);
    setOpen(false);
  };

  const renderUser = (user: UserData) => (
    <MenuItem key={user.id} value={user.id}>
      <ListItemAvatar>
        <Avatar src={user.avatar} />
      </ListItemAvatar>
      <Typography>
        {user.firstName} {user.lastName}
      </Typography>
    </MenuItem>
  );

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={() => setOpen(true)}
      >
        Change {userType}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change {userType}</DialogTitle>
        <DialogContent>
          <Select
            id="user"
            name="user"
            fullWidth
            value={currentUserId}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
              setCurrentUserId(event.target.value as number)
            }
            renderValue={(selected) => {
              const user = availableUsers.find(
                (u) => u.id === (selected as number)
              );
              if (user === undefined) {
                return "None";
              }
              return renderUser(user);
            }}
          >
            {availableUsers.map((user) => renderUser(user))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangeUser;
