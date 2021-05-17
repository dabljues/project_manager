/* eslint-disable react/jsx-props-no-spreading */
import TextField from "@material-ui/core/TextField";
import FieldErrors from "../FieldErrors";

const ValidatedTextField = ({ errors, ...rest }: any) => {
  const errorsOccurred = errors.length > 0;
  return (
    <TextField
      {...rest}
      error={errorsOccurred}
      helperText={<FieldErrors errors={errors} />}
    />
  );
};

export default ValidatedTextField;
