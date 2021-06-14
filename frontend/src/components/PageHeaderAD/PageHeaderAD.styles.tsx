import React from "react";
import { Avatar, Input, PageHeader as PH, Typography, Row, Col } from "antd";
import styled from "styled-components/macro";

const { Search } = Input;

const { Text } = Typography;

const PageHeader = styled(PH)`
  background: #3f51b5;
`;

const Nav = styled(Row)`
  align-items: center;
  padding-left: 3rem;
  padding-right: 3rem;
`;

interface NavSectionProps {
  textAlign?: string;
}

const NavSection = (props: React.PropsWithChildren<NavSectionProps>) => {
  const { textAlign, children } = props;

  const StyledCol = styled(Col)`
    text-align: ${textAlign};
  `;
  return <StyledCol span={8}>{children}</StyledCol>;
};

NavSection.defaultProps = { textAlign: "center" };

const SearchBox = styled(Search)`
  width: 800;
`;

const PageTitle = styled(Text)`
  font-size: 2rem;
  font-weight: bold;
  color: snow;
`;

export { Nav, NavSection, PageTitle, SearchBox, PageHeader };
