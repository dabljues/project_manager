import "antd/dist/antd.css";

import { PageHeader as PH } from "antd";
import Breadcrumbs from "components/shared/Breadcrumbs";
import UserMenu from "components/UserMenu";
import { RouteComponentProps, withRouter } from "react-router-dom";
import UserData from "types/userData";

import * as S from "./PageHeaderAD.styles";

interface PageHeaderADProps extends RouteComponentProps<any> {
  currentUser: UserData | null;
  logOut: () => void;
}

const PageHeaderAD = (props: PageHeaderADProps) => {
  const { location, currentUser, logOut } = props;
  const loggedIn = currentUser !== null;

  const userMenu = loggedIn ? (
    <UserMenu currentUser={currentUser} logOut={logOut} />
  ) : null;

  if (location.pathname === "/404") {
    return <PH title="Project Manager" extra={userMenu} />;
  }

  return (
    <S.PageHeader>
      <S.Nav align="middle">
        <S.BreadCrumbsWrapper xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Breadcrumbs />
        </S.BreadCrumbsWrapper>
        <S.PageTitleWrapper xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
          <S.PageTitle>Project Manager</S.PageTitle>
        </S.PageTitleWrapper>
        <S.UserMenu xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
          <S.SearchBox placeholder="search for..." size="large" allowClear />
          {userMenu}
        </S.UserMenu>
      </S.Nav>
    </S.PageHeader>
  );
};

export default withRouter(PageHeaderAD);
