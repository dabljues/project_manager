import { Card } from "antd";
import React from "react";
import styled from "styled-components/macro";

import EntityName from "../EntityName";

interface ProjectEntityProps {
  name: string;
}

const ProjectEntity = (props: React.PropsWithChildren<ProjectEntityProps>) => {
  const { name, children } = props;
  const StyledCard = styled(Card)`
    min-width: 400px;
    min-height: 500px;
    border-radius: 50px;
    box-shadow: 0px -1px 15px 2px rgba(0, 0, 0, 0.27);
    overflow: hidden;
    margin: 30px;
  `;
  return (
    <StyledCard
      title={<EntityName name={name} />}
      headStyle={{ backgroundColor: "#3f51b5" }}
    >
      {children}
    </StyledCard>
  );
};

export default ProjectEntity;
