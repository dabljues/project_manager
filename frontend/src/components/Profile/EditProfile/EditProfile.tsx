import "./EditProfile.scss";

import axios from "axios";
import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import { authRequest } from "../../../api/auth";
import UserData from "../../../types/userData";

interface EditProfileProps {
  userData: UserData;
}

async function editUser(
  id: number,
  firstName: string,
  lastName: string,
  email: string
) {
  const x = await authRequest()
    .patch(`/user/${id}/`, {
      first_name: firstName,
      last_name: lastName,
      email,
    })
    .then(() => null)
    .catch((error) => error.response.data);
  return x;
}

const EditProfile = (props: EditProfileProps) => {
  const { userData } = props;

  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [email, setEmail] = useState(userData?.email);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);

  const errorsOccurred = emailErrors.length > 0;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const errors = await editUser(userData.id, firstName, lastName, email);
    if (errors) {
      setEmailErrors(errors.email);
    } else {
      setEmailErrors([]);
      setOpen(false);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Edit profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        {errorsOccurred ? (
          <div className="form-errors">
            Profile edit was unsucessful:
            <ul>
              {emailErrors.map((error, index) => (
                <li className="form-error">{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <DialogContent>
          <TextField
            autoFocus
            id="firstName"
            label="First name"
            defaultValue={userData?.firstName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setFirstName(event.target.value);
            }}
            fullWidth
          />
          <TextField
            id="lastName"
            label="Last name"
            defaultValue={userData?.lastName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setLastName(event.target.value);
            }}
            fullWidth
          />
          <TextField
            id="email"
            label="Email address"
            type="email"
            defaultValue={userData?.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setEmail(event.target.value);
            }}
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
    </div>
  );
};
export default EditProfile;
