import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { authRequest } from "../../../api/auth";
import UserData from "../../../types/userData";
import ValidatedTextField from "../../shared/ValidatedTextField";
import DialogContent from "./ChangePassword.styles";

interface ChangePasswordProps {
  userData: UserData;
}

async function changePassword(
  id: number,
  currentPassword: string,
  password: string,
  passwordConfirmation: string
) {
  const x = await authRequest()
    .post(`/user/${id}/change_password/`, {
      current_password: currentPassword,
      password,
      password_confirmation: passwordConfirmation,
    })
    .then(() => null)
    .catch((error) => error.response.data);
  return x;
}

const ChangePassword = (props: ChangePasswordProps) => {
  const { userData } = props;

  const [open, setOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [currentPasswordErrors, setCurrentPasswordErrors] = useState<string[]>(
    []
  );
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordConfirmationErrors, setPasswordConfirmationErrors] = useState<
    string[]
  >([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPassword("");
    setPassword("");
    setPasswordConfirmation("");
    setCurrentPasswordErrors([]);
    setPasswordErrors([]);
    setPasswordConfirmationErrors([]);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const errors = await changePassword(
      userData.id,
      currentPassword,
      password,
      passwordConfirmation
    );
    if (!errors) {
      handleClose();
      return;
    }
    setCurrentPasswordErrors(errors.current_password || []);
    setPasswordErrors(errors.password || []);
    setPasswordConfirmationErrors(errors.password_confirmation || []);
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Change password
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change password</DialogTitle>
        <DialogContent className="dialog-content">
          <ValidatedTextField
            autoFocus
            variant="outlined"
            label="Current password"
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setCurrentPassword(event.target.value);
            }}
            errors={currentPasswordErrors}
            fullWidth
          />
          <ValidatedTextField
            variant="outlined"
            label="New password"
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setPassword(event.target.value);
            }}
            errors={passwordErrors}
            fullWidth
          />
          <ValidatedTextField
            variant="outlined"
            label="Password confirmation"
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setPasswordConfirmation(event.target.value);
            }}
            errors={passwordConfirmationErrors}
            fullWidth
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
export default ChangePassword;
