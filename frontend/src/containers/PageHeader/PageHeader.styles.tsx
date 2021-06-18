import styled from "styled-components/macro";

import { Grid, Typography, TextField, Toolbar } from "@material-ui/core";

const Nav = styled(Grid)`
  padding-left: 3rem;
  padding-right: 3rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  min-width: 600px;
`;

const SiteLogo = styled(Grid)`
  display: none;
  justify-content: flex-start;

  @media (min-width: 400px) {
    justify-content: center;
  }

  @media (min-width: 1280px) {
    display: flex;
    justify-content: flex-start;
  }
`;

const PageTitleWrapper = styled(Grid)`
  display: flex;
  justify-content: flex-start;
  @media (min-width: 400px) {
    justify-content: center;
  }
`;

const PageTitle = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  color: snow;
`;

const Extra = styled(Grid)`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;

  @media (min-width: 400px) {
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 960px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
`;

const SearchBox = styled(TextField)`
  max-width: 400px;
  margin-right: 3rem;
`;

const UserMenuWrapper = styled(Grid)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export {
  Extra,
  Nav,
  PageTitle,
  SearchBox,
  SiteLogo,
  PageTitleWrapper,
  UserMenuWrapper,
};
