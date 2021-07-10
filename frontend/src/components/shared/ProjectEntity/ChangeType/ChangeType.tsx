import React, { useState } from "react";
import { Dictionary } from "types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@material-ui/core";

interface ChangeTypeProps {
  value: string;
  onSubmit: (value: string) => Promise<void>;
}

const ChangeType = (props: ChangeTypeProps) => {
  const { value, onSubmit } = props;
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(value);

  const typeMapping: Dictionary<string> = {
    Bug: "B",
    Improvement: "I",
    Task: "T",
  };

  const handleClose = () => {
    setOpen(false);
    setType("");
  };

  const handleSubmit = async () => {
    if (type === value) {
      return;
    }
    onSubmit(typeMapping[type]);
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
        Change type
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change type</DialogTitle>
        <DialogContent>
          <Select
            id="type"
            name="type"
            fullWidth
            value={type}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
              setType(event.target.value as string)
            }
          >
            <MenuItem value="Bug">Bug</MenuItem>
            <MenuItem value="Improvement">Improvement</MenuItem>
            <MenuItem value="Task">Task</MenuItem>
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

export default ChangeType;
