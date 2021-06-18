import styled from "styled-components/macro";

import { MenuItem as MI, Typography } from "@material-ui/core";

const User = styled(Typography)`
  display: none;
  color: snow;
  font-size: 1.5rem;
  @media (min-width: 1600px) {
    display: block;
  }
`;
const MenuItem = styled(MI)`
  font-size: 1.125rem;
`;

export { MenuItem, User };
