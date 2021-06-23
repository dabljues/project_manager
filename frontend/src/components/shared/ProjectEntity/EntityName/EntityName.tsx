import styled from "styled-components/macro";

import { Avatar, CardHeader, Typography } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";

const Icon = styled(AssignmentIcon)`
  color: white;
  font-size: 4rem;
`;

const Name = styled(Typography)`
  color: white;
  font-size: 4rem;
`;

const StyledHeader = styled(CardHeader)`
  display: flex;
  background-color: #3f51b5;
  align-items: center;
`;

const EntityName = ({ name }: { name: string }) => (
  <StyledHeader avatar={<Icon />} title={<Name>{name}</Name>} />
);

export default EntityName;
