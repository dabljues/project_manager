import styled from "styled-components/macro";

import { Chip, Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { CheckCircleOutlined } from "@material-ui/icons";
import React from "react";

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

interface StatusRowProps {
  status: string;
}

const StatusRow = (props: React.PropsWithChildren<StatusRowProps>) => {
  const { status, children } = props;
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.between("xs", "sm"));

  return (
    <Status container alignItems="center">
      <StatusTag item xs={12} sm={12} md={2}>
        <Chip icon={<CheckCircleOutlined />} label={status} />
      </StatusTag>
      <StatusButtonsWrapper item xs={12} sm={12} md={10}>
        <StatusButtons>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                fullWidth: small,
                variant: "contained",
              });
            }
            return child;
          })}
        </StatusButtons>
      </StatusButtonsWrapper>
    </Status>
  );
};

export default StatusRow;
