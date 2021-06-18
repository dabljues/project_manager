import React from "react";
import styled from "styled-components/macro";

import {
  fade,
  createStyles,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
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
  justify-content: flex-end;
  align-items: center;
`;

export {
  Extra,
  Nav,
  PageTitle,
  Search,
  SiteLogo,
  PageTitleWrapper,
  UserMenuWrapper,
};
