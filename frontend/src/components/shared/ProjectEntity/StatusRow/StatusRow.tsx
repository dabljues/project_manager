import styled from "styled-components/macro";

import { Button, Chip, Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { CheckCircleOutlined } from "@material-ui/icons";

const Status = styled(Grid)`
  margin-bottom: 4rem;
`;

const StatusTag = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 1.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.values.md}px) {
    justify-content: flex-start;
    margin-bottom: 0;
  }
`;

const StatusButtonsWrapper = styled(Grid)``;

const StatusButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  button:not(:last-child) {
    margin-bottom: 8px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.values.md}px) {
    flex-direction: row;
    justify-content: flex-end;
    button:not(:last-child) {
      margin-bottom: 0;
      margin-right: 8px;
    }
  }
`;

const StatusRow = ({ status }: { status: string }) => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.between("xxs", "sm"));

  const buttons = (
    <>
      <Button color="primary" fullWidth={small} variant="contained">
        In progress
      </Button>
      <Button color="primary" fullWidth={small} variant="contained">
        In review
      </Button>
      <Button color="primary" fullWidth={small} variant="contained">
        Done
      </Button>
      <Button color="secondary" fullWidth={small} variant="contained">
        Close
      </Button>
    </>
  );
  return (
    <Status container alignItems="center">
      <StatusTag item xs={12} sm={12} md={2}>
        <Chip icon={<CheckCircleOutlined />} label={status} />
      </StatusTag>
      <StatusButtonsWrapper item xs={12} sm={12} md={10}>
        <StatusButtons>{buttons}</StatusButtons>
      </StatusButtonsWrapper>
    </Status>
  );
};

export default StatusRow;
