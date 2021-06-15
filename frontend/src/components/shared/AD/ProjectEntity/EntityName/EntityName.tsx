import { Card } from "antd";
import styled from "styled-components/macro";

import AssignmentIcon from "@material-ui/icons/Assignment";

const Icon = styled(AssignmentIcon)`
  color: white;
  font-size: 1em;
  margin-right: 15px;
`;

const Logo = styled.div`
  color: white;
  font-size: 1em;
`;

const Name = styled.div`
  display: flex;
  font-size: 4rem;
  align-items: center;
`;

const EntityName = ({ name }: { name: string }) => (
  <Name>
    <Icon />
    <Logo>{name}</Logo>
  </Name>
);

export default EntityName;
