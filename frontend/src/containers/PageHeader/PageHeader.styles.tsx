import React from "react";
import styled from "styled-components/macro";

import {
  fade,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      width: "100%",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  })
);

const AppBar = styled.header`
  // flex-grow, flex-shrink, flex-basis
  // eqivalent to flex: initial
  // this is the default for flex, so it doesn't have to be defined
  flex: 0 1 auto;
  background-color: #3f51b5;
  color: white;
  margin-bottom: 0.1rem;
  width: 100%;
  position: sticky;
`;

const Nav = styled(Grid)`
  padding-left: 0rem;
  padding-right: 0rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  justify-content: center;
  @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    justify-content: unset;
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

const BreadCrumbsWrapper = styled(Grid)`
  display: none;
  justify-content: flex-start;
  @media (min-width: ${(props) => props.theme.breakpoints.values.md}px) {
    display: flex;
    justify-content: flex-start;
  }
`;

const SiteLogo = styled(Grid)`
  display: flex;
  justify-content: flex-start;
  @media (min-width: ${(props) => props.theme.breakpoints.values.md}px) {
    display: none;
  }
`;

const PageTitleWrapper = styled(Grid)`
  display: none;
  justify-content: center;

  @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    display: flex;
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
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const SearchWrapper = (props: React.PropsWithChildren<any>) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      {children}
    </div>
  );
};

const Search = () => {
  const classes = useStyles();

  return (
    <SearchWrapper>
      <InputBase
        placeholder="Search..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </SearchWrapper>
  );
};

const UserMenuWrapper = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export {
  AppBar,
  BreadCrumbsWrapper,
  Extra,
  Nav,
  PageTitle,
  PageTitleWrapper,
  Search,
  SiteLogo,
  UserMenuWrapper,
};
