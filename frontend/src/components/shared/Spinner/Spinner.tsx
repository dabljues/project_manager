import { CircularProgress } from "@material-ui/core";
import CenteredDiv from "components/shared/CenteredDiv";

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
      <CenteredDiv>
        <CircularProgress />
      </CenteredDiv>
    );
  }
  return <CircularProgress />;
};

Spinner.defaultProps = defaultProps;

export default Spinner;
