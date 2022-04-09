import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { authRequest } from "../../../api/auth";
import UserData from "../../../types/userData";
import ValidatedTextField from "../../shared/ValidatedTextField";
import DialogContent from "./EditProfile.styles";

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
  const [firstNameErrors, setFirstNameErrors] = useState<string[]>([]);
  const [lastNameErrors, setLastNameErrors] = useState<string[]>([]);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFirstNameErrors([]);
    setLastNameErrors([]);
    setEmailErrors([]);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const errors = await editUser(userData.id, firstName, lastName, email);
    if (!errors) {
      handleClose();
      return;
    }
    setFirstNameErrors(errors.fist_name || []);
    setLastNameErrors(errors.last_name || []);
    setEmailErrors(errors.email || []);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Edit profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        <DialogContent className="dialog-content">
          <ValidatedTextField
            autoFocus
            label="First name"
            defaultValue={userData?.firstName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setFirstName(event.target.value);
            }}
            errors={firstNameErrors}
            fullWidth
          />
          <ValidatedTextField
            label="Last name"
            defaultValue={userData?.lastName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setLastName(event.target.value);
            }}
            errors={lastNameErrors}
            fullWidth
          />
          <ValidatedTextField
            label="Email address"
            type="email"
            defaultValue={userData?.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setEmail(event.target.value);
            }}
            errors={emailErrors}
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
export default EditProfile;
