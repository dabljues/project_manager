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
import MappingSelect from "components/shared/MappingSelect";

interface ChangeTypeProps {
  value: string;
  typeMapping: Dictionary<string>;
  onSubmit: (value: string) => Promise<void>;
}

const ChangeType = (props: ChangeTypeProps) => {
  const { value, typeMapping, onSubmit } = props;
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(value);

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
          <MappingSelect
            value={type}
            setValue={setType}
            mapping={typeMapping}
          />
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
