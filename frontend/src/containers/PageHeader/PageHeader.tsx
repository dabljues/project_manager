import Breadcrumbs from "components/shared/Breadcrumbs";
import UserMenu from "components/UserMenu";
import { useHistory } from "react-router-dom";

import { Grid } from "@material-ui/core";
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
    <S.AppBar>
      <S.Nav container alignItems="center" wrap="nowrap">
        <S.BreadCrumbsWrapper item xs={4}>
          <Breadcrumbs />
        </S.BreadCrumbsWrapper>
        <S.SiteLogo item xxs={1} sm={1} md={4}>
          <IconButton onClick={() => history.push("/")}>
            <Avatar>PM</Avatar>
          </IconButton>
        </S.SiteLogo>
        <S.PageTitleWrapper item sm={7} md={4}>
          <S.PageTitle>Project Manager</S.PageTitle>
        </S.PageTitleWrapper>
        <S.Extra item xxs={10} sm={4}>
          <Grid item md={8} lg={6} xl={7}>
            <S.Search />
          </Grid>
          {loggedIn ? (
            <S.UserMenuWrapper item md={4} lg={6} xl={5}>
              <UserMenu currentUser={currentUser} logOut={logOut} />
            </S.UserMenuWrapper>
          ) : null}
        </S.Extra>
      </S.Nav>
    </S.AppBar>
  );
};

export default PageHeader;
