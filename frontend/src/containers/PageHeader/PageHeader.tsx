import UserMenu from "components/UserMenu";
import { useHistory } from "react-router-dom";

import { Grid, Toolbar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import UserData from "../../types/userData";
import * as S from "./PageHeader.styles";

type PageHeaderProps = {
  currentUser: UserData | null;
  logOut: () => void;
};

const PageHeader = (props: PageHeaderProps) => {
  const { currentUser, logOut } = props;
  const loggedIn = currentUser !== null;
  const history = useHistory();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <S.Nav container alignItems="center">
          <S.SiteLogo item xs={12} sm={12} md={12} lg={4} xl={4}>
            <IconButton onClick={() => history.push("/")}>
              <Avatar>PM</Avatar>
            </IconButton>
          </S.SiteLogo>
          <S.PageTitleWrapper item xs={12} sm={12} md={6} lg={4} xl={4}>
            <S.PageTitle>Project Manager</S.PageTitle>
          </S.PageTitleWrapper>
          <S.Extra item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Grid item xl={7}>
              <S.SearchBox fullWidth />
            </Grid>
            {loggedIn ? (
              <S.UserMenuWrapper item lg={5}>
                <UserMenu currentUser={currentUser} logOut={logOut} />
              </S.UserMenuWrapper>
            ) : null}
          </S.Extra>
        </S.Nav>
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
