import styled, { css } from "styled-components/macro";

const ProjectEntity = styled.div`
  margin: 30px !important;
  border: 1px solid black;
  border-radius: 30px;
  overflow: hidden;
`;

const ProjectEntityHeader = styled.div`
  display: flex;
  border-bottom: 1px black solid;
  padding: 20px;

  background: #3f51b5;
  align-items: center;
  font-size: 4rem;
`;

const ProjectEntityIcon = css`
  font-size: 1em;
  margin-right: 15px;
`;

const ProjectEntityInfo = styled.div`
  margin-top: 20px;
  padding: 20px;
`;

const ProjectEntityName = styled.span`
  color: snow;
`;

export {
  ProjectEntity,
  ProjectEntityHeader,
  ProjectEntityIcon,
  ProjectEntityInfo,
  ProjectEntityName,
};
