import { Grid, Divider } from "@material-ui/core";
import React from "react";
import styled from "styled-components/macro";

interface ResponsiveColProps {
  justifyContent?: string;
}

const ResponsiveCol = styled(Grid)<ResponsiveColProps>`
  display: flex;
  align-items: center;
  text-align: center;
  word-break: break-word;
`;

const DetailEntryWrapper = (props: React.PropsWithChildren<any>) => {
  const { children } = props;

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
      {children}
    </Grid>
  );
};

const Detail = styled(Grid)`
  font-size: 1rem;
  border: 1px solid black;

  @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    border: none;
  }
`;

const DetailLabel = styled(ResponsiveCol)`
  font-weight: bold;
  font-size: 1.25em;
  justify-content: center;

  @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    justify-content: flex-start;
  }
`;

const DetailContent = styled(ResponsiveCol)`
  justify-content: center;

  @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    justify-content: flex-start;
  }
`;

const EditButtonWrapper = styled(ResponsiveCol)`
  @media (min-width: 1200px) {
    justify-content: flex-end;
  }
`;

const DetailDivider = styled(Divider)`
  margin: 0.7rem 0;
`;

export {
  DetailEntryWrapper,
  Detail,
  DetailContent,
  DetailLabel,
  DetailDivider,
  EditButtonWrapper,
  ResponsiveCol,
};
