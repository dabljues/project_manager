import { authRequest } from "api/auth";
import ProjectParticipants from "containers/Project/Project/utils";
import React, { useEffect, useState } from "react";
import TaskData from "types/task";
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

interface ChangeAssigneeProps {
  task: TaskData;
  onSubmit: (value: number) => Promise<void>;
}

const ChangeAssignee = (props: ChangeAssigneeProps) => {
  const { task, onSubmit } = props;
  const [open, setOpen] = useState(false);
  const [assignee, setAssignee] = useState(task.assignee.id);
  const [projectParticipants, setProjectParticipants] = useState<UserData[]>(
    []
  );
  const authCommunicator = authRequest();

  useEffect(() => {
    const getParticipants = async () => {
      await authCommunicator
        .get(`/project/${task.project.name}`)
        .then((response) => setProjectParticipants(response.data.participants));
    };
    getParticipants();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (assignee === task.assignee.id) {
      return;
    }
    onSubmit(assignee);
    setOpen(false);
  };

  const renderParticipant = (participant: UserData) => (
    <MenuItem key={participant.id} value={participant.id}>
      <ListItemAvatar>
        <Avatar src={participant.avatar} />
      </ListItemAvatar>
      <Typography>
        {participant.firstName} {participant.lastName}
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
        Change assignee
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change assignee</DialogTitle>
        <DialogContent>
          <Select
            id="assignee"
            name="assignee"
            fullWidth
            value={assignee}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
              setAssignee(event.target.value as number)
            }
            renderValue={(selected) => {
              const user = projectParticipants.find(
                (u) => u.id === (selected as number)
              );
              if (user === undefined) {
                return "None";
              }
              return renderParticipant(user);
            }}
          >
            {projectParticipants.map((participant) =>
              renderParticipant(participant)
            )}
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

export default ChangeAssignee;
