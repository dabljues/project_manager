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
    <S.PageHeader breadcrumb={<Breadcrumbs />}>
      <S.Nav>
        <S.NavSection textAlign="left">
          <S.PageTitle>Project Manager</S.PageTitle>
        </S.NavSection>
        <S.NavSection>
          <S.SearchBox placeholder="search for..." size="large" allowClear />
        </S.NavSection>
        <S.NavSection textAlign="right">{userMenu}</S.NavSection>
      </S.Nav>
    </S.PageHeader>
  );
};

export default withRouter(PageHeaderAD);
