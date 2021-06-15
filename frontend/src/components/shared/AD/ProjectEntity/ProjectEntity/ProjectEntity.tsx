import { Card } from "antd";
import React from "react";
import styled from "styled-components/macro";

import EntityName from "../EntityName";

const StyledCard = styled(Card)`
  min-width: 500px;
  min-height: 500px;
  border-radius: 50px;
  box-shadow: 0px -1px 15px 2px rgba(0, 0, 0, 0.27);
  overflow: hidden;
  margin: 30px 50px 0 50px;

  @media (min-width: 992px) {
    margin-left: 100px;
    margin-right: 100px;
  }

  @media (min-width: 1700px) {
    margin-left: 300px;
    margin-right: 300px;
  }
`;

interface ProjectEntityProps {
  name: string;
}

const ProjectEntity = (props: React.PropsWithChildren<ProjectEntityProps>) => {
  const { name, children } = props;

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
