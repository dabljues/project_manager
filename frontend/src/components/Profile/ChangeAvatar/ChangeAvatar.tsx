import axios from "axios";
import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { authRequest } from "../../../api/auth";
import UserData from "../../../types/userData";
import ValidatedTextField from "../../shared/ValidatedTextField";

interface ChangeAvatarProps {
  userData: UserData;
}

async function changeAvatar(id: number, avatar: any) {
  const formData = new FormData();
  formData.append("avatar", avatar);
  const x = await authRequest()
    .post(`/user/${id}/change_avatar/`, formData)
    .then(() => null)
    .catch((error) => error.response.data);
  return x;
}

const ChangeAvatar = (props: ChangeAvatarProps) => {
  const { userData } = props;

  const [open, setOpen] = useState(false);
  const [avatarErrors, setAvatarErrors] = useState<string[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAvatarErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files === null || files.length === 0) {
      return;
    }
    const avatar = files[0];
    const errors = await changeAvatar(userData.id, avatar);
    if (!errors) {
      handleClose();
      return;
    }
    setAvatarErrors(errors.avatar || []);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Change Avatar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change avatar</DialogTitle>
        <DialogContent className="dialog-content">
          <Button color="secondary" variant="contained" component="label">
            Upload File
            <input type="file" hidden onChange={handleSubmit} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ChangeAvatar;
