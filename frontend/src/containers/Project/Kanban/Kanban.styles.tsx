import React from "react";
import styled from "styled-components/macro";

import { Grid, Typography } from "@material-ui/core";

const Kanban = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
  margin-top: 3rem;
`;

const StyledRow = styled(Grid)`
  margin-bottom: 2rem;
  display: none;
  @media (min-width: ${(props) => props.theme.breakpoints.values.md}px) {
    display: flex;
  }
`;

const KanbanColumnHeaderRow = (props: React.PropsWithChildren<any>) => {
  const { children } = props;

  return <StyledRow container>{children}</StyledRow>;
};

const StyledHeader = styled(Typography)`
  margin-left: 2rem;
`;

const KanbanColumnHeader = (props: React.PropsWithChildren<any>) => {
  const { children } = props;

  return <StyledHeader variant="h4">{children}</StyledHeader>;
};

export { Kanban, KanbanColumnHeader, KanbanColumnHeaderRow };
