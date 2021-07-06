import React from "react";
import styled from "styled-components/macro";

import { Grid, Typography } from "@material-ui/core";

const Kanban = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
  margin-top: 3rem;
`;

const KanbanColumnHeaderRow = (props: React.PropsWithChildren<any>) => {
  const { children } = props;
  const StyledRow = styled(Grid)`
    margin-bottom: 2rem;
  `;
  return <StyledRow container>{children}</StyledRow>;
};

const KanbanColumnHeader = (props: React.PropsWithChildren<any>) => {
  const { children } = props;
  const StyledHeader = styled(Typography)`
    margin-left: 2rem;
  `;
  return <StyledHeader variant="h4">{children}</StyledHeader>;
};

export { Kanban, KanbanColumnHeader, KanbanColumnHeaderRow };
