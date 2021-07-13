import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";

interface DeleteEntityProps {
  entityType: "project" | "task" | "subtask";
  onSubmit: () => Promise<void>;
}

const DeleteEntity = (props: DeleteEntityProps) => {
  const { entityType, onSubmit } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    onSubmit();
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
        Delete {entityType}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete {entityType}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the {entityType}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteEntity;
