import { Card, CardContent } from "@material-ui/core";
import { TaskIcons } from "models";
import React from "react";
import styled from "styled-components/macro";
import { IconInfo } from "types";

import EntityName from "../EntityName";

const StyledCard = styled(Card)`
  border-radius: 50px;
  box-shadow: 0px -1px 15px 2px rgba(0, 0, 0, 0.27);
  overflow: hidden;
  margin: 0;
  @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    margin: 30px 5% 0 5%;
  }
  @media (min-width: 1600px) {
    margin: 30px 12% 0 12%;
  }
  @media (min-width: 2150px) {
    margin-left: 20%;
    margin-right: 20%;
  }
`;

interface ProjectEntityProps {
  name: string;
  icon: React.ComponentType;
}

const ProjectEntity = (props: React.PropsWithChildren<ProjectEntityProps>) => {
  const { name, icon, children } = props;

  return (
    <StyledCard>
      <EntityName name={name} icon={icon} />
      <CardContent>{children}</CardContent>
    </StyledCard>
  );
};

export default ProjectEntity;
