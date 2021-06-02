import { CircularProgress } from "@material-ui/core";

interface SpinnerProps {
  centered?: boolean;
}

const defaultProps: SpinnerProps = {
  centered: false,
};

const Spinner = (props: SpinnerProps) => {
  const { centered } = props;
  if (centered) {
    return (
      <div className="center">
        <CircularProgress />
      </div>
    );
  }
  return <CircularProgress />;
};

Spinner.defaultProps = defaultProps;

export default Spinner;
