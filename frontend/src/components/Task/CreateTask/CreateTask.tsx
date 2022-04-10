import { authRequest, getCurrentUser } from "api/auth";
import DialogButtons from "components/shared/DialogForm";
import MappingSelect from "components/shared/MappingSelect";
import Spinner from "components/shared/Spinner";
import { useFormik } from "formik";
import { renderUserMenuItem } from "helpers";
import { TaskTypes } from "models";
import React, { useEffect, useState } from "react";
import { ProjectData, TaskData, UserData, WriteTaskData } from "types";
import * as yup from "yup";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import CreateTaskButton from "./CreateTask.styles";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required(),
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
  const [availableParents, setAvailableParents] = useState<TaskData[]>([]);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const availableUsers = project.participants;

  const authCommunicator = authRequest();

  useEffect(() => {
    const getUser = async () => {
      setCurrentUser(await getCurrentUser());
    };
    const getTasks = async () => {
      const projectTasks = await authCommunicator.get(
        `/project/${project.name}/tasks`
      );
      projectTasks.data.sort((val1: TaskData, val2: TaskData) =>
        val1.name > val2.name ? 1 : -1
      );
      setAvailableParents(projectTasks.data);
    };
    getUser();
    getTasks();
    return () => setCurrentUser(null);
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      status: "NW",
      type: "Task",
      parent: null,
      description: "",
      assignee: null,
      project: project.id,
      owner: currentUser === null ? null : currentUser.id,
    },
    validationSchema,
    onSubmit: async (values) => {
      onSubmit({
        title: values.title,
        type: TaskTypes[values.type],
        parent: values.parent,
        description: values.description,
        assignee: values.assignee,
        owner: values.owner,
        project: values.project,
      });
      setOpen(false);
    },
    enableReinitialize: true,
  });

  const handleClose = () => {
    setOpen(false);
  };

  if (currentUser === null) {
    return <Spinner />;
  }

  return (
    <>
      <CreateTaskButton
        color="primary"
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Create a task
      </CreateTaskButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a task</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth margin="dense" variant="outlined">
              <TextField
                id="title"
                name="title"
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
                name="description"
                label="Description"
                multiline
                variant="outlined"
                value={formik.values.description}
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
              <InputLabel>Task type</InputLabel>
              <MappingSelect
                value={formik.values.type}
                setValue={(value: any) => {
                  formik.setFieldValue("type", value);
                }}
                mapping={TaskTypes}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Assignee</InputLabel>
              <Select
                id="assignee"
                name="Assignee"
                label="Assignee"
                defaultValue=""
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  formik.setFieldValue(
                    "assignee",
                    event.target.value as number
                  );
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
            <FormControl fullWidth margin="dense">
              <InputLabel>Parent</InputLabel>
              <Select
                id="parent"
                name="Parent"
                label="Parent"
                defaultValue=""
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  formik.setFieldValue("parent", event.target.value as number);
                }}
                renderValue={(selected) => {
                  const parent = availableParents.find(
                    (u) => u.id === (selected as number)
                  );
                  if (parent === undefined) {
                    return "None";
                  }
                  return <MenuItem value={parent.id}>{parent.name}</MenuItem>;
                }}
              >
                {availableParents.map((parent) => (
                  <MenuItem value={parent.id}>{parent.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <DialogButtons
              okText="Create"
              cancelText="Cancel"
              handleClose={handleClose}
            />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTask;
