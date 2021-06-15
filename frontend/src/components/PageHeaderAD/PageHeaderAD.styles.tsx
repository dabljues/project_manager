import { Input, PageHeader as PH, Typography, Row, Col } from "antd";
import styled from "styled-components/macro";

const { Search } = Input;

const { Text } = Typography;

const PageHeader = styled(PH)`
  background: #3f51b5;
  // This styles the PageHeader content, cannot be done the other way
  > * {
    padding-top: 0;
  }
`;

const Nav = styled(Row)`
  padding-left: 3rem;
  padding-right: 3rem;
  min-width: 425px;
`;

const NavSection = styled(Col)``;

const BreadCrumbsWrapper = styled(Col)`
  display: flex;
  justify-content: flex-start;
  @media (min-width: 400px) {
    justify-content: center;
  }
  @media (min-width: 992px) {
    justify-content: flex-start;
  }
`;

const UserMenu = styled(Col)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  @media (min-width: 400px) {
    justify-content: center;
  }
  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const SearchBox = styled(Search)`
  display: none;
  max-width: 400px;
  margin-right: 3rem;
  @media (min-width: 768px) {
    display: block;
  }
`;

const PageTitleWrapper = styled(Col)`
  display: flex;
  justify-content: flex-start;
  @media (min-width: 400px) {
    justify-content: center;
  }
`;

const PageTitle = styled(Text)`
  font-size: 2rem;
  font-weight: bold;
  color: snow;
`;

export {
  BreadCrumbsWrapper,
  Nav,
  NavSection,
  PageTitle,
  SearchBox,
  PageHeader,
  PageTitleWrapper,
  UserMenu,
};
