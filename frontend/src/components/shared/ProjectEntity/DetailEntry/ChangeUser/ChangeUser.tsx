import React, { useEffect, useState } from "react";
import UserData from "types/userData";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
} from "@material-ui/core";
import UserMenuItem from "components/shared/User/UserMenuItem";

interface ChangeUserProps {
  userType: "assignee" | "owner";
  currentUser: UserData | null;
  getAvailableUsers: () => Promise<UserData[]>;
  onSubmit: (value: number) => Promise<void>;
}

const ChangeUser = (props: ChangeUserProps) => {
  const { userType, currentUser, getAvailableUsers, onSubmit } = props;
  const initialUserId = currentUser === null ? -1 : currentUser.id;
  const [open, setOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(initialUserId);
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
    if (currentUserId === initialUserId) {
      return;
    }
    onSubmit(currentUserId);
    setOpen(false);
  };

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
              return <UserMenuItem user={user} />;
            }}
          >
            {availableUsers.map((user) => (
              <UserMenuItem user={user} />
            ))}
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
