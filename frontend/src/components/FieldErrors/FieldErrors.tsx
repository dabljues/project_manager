interface FieldErrorsProps {
  errors: string[];
}

const FieldErrors = (props: FieldErrorsProps) => {
  const { errors } = props;
  const errorsOccurred = errors.length > 0;

  return (
    <>
      {errorsOccurred ? (
        <ul>
          {errors.map((error, index) => (
            <li className="form-error">{error}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default FieldErrors;
