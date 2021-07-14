import { getCurrentUser } from "api/auth";
import Spinner from "components/shared/Spinner";
import { useFormik } from "formik";
import renderUserMenuItem from "helpers";
import { rest } from "lodash";
import React, { ReactEventHandler, useEffect, useState } from "react";
import { ProjectData, UserData, WriteTaskData } from "types";
import * as yup from "yup";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  TextField,
} from "@material-ui/core";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title cannot exceed 100 characters"),
  description: yup
    .string()
    .max(2000, "Description cannot exceed 2000 characters"),
});

interface CreateTaskProps {
  project: ProjectData;
  onSubmit: (task: WriteTaskData) => Promise<void>;
}

const CreateTask = (props: CreateTaskProps) => {
  const { project, onSubmit } = props;
  const [open, setOpen] = useState(false);
  const availableUsers = project.participants;
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    const getUser = async () => {
      setCurrentUser(await getCurrentUser());
    };
    getUser();
    return () => setCurrentUser(null);
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      status: "NW",
      type: "T",
      description: "",
      assignee: "",
      project: project.name,
      owner: currentUser === null ? "" : currentUser.id,
    },
    validationSchema,
    onSubmit: async (values) => {
      onSubmit({
        title: values.title,
        status: values.status,
        type: values.type,
        description: values.description,
        assignee: values.assignee as unknown as number,
        project: values.project,
        owner: values.owner as number,
      });
      setOpen(false);
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  if (currentUser === null) {
    return <Spinner />;
  }

  return (
    <>
      <Button color="primary" variant="contained" onClick={() => setOpen(true)}>
        Create a task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a task</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth margin="dense" variant="outlined">
              <TextField
                id="title"
                name="Title"
                label="Title"
                autoFocus
                variant="outlined"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                id="description"
                name="Description"
                label="Description"
                multiline
                variant="outlined"
                rows={10}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <Select
                id="assignee"
                name="Assignee"
                defaultValue=""
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  console.log(event.target.value as number);
                  formik.setFieldValue("assignee", "");
                  console.log(formik.values);
                }}
                renderValue={(selected) => {
                  const user = availableUsers.find(
                    (u) => u.id === (selected as number)
                  );
                  if (user === undefined) {
                    return "None";
                  }
                  return renderUserMenuItem(user);
                }}
              >
                {availableUsers.map((user) => renderUserMenuItem(user))}
              </Select>
            </FormControl>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTask;
