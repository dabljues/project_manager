import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title cannot exceed 100 characters"),
});

interface ChangeTitleProps {
  value: string;
  onSubmit: (value: string) => Promise<void>;
}

const ChangeTitle = (props: ChangeTitleProps) => {
  const { value, onSubmit } = props;
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: value,
    },
    validationSchema,
    onSubmit: async (values) => {
      onSubmit(values.title);
      setOpen(false);
    },
  });

  const handleClose = () => {
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
        Change title
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change title</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="title"
              name="title"
              autoFocus
              fullWidth
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangeTitle;
