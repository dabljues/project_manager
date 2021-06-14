import { Avatar, Dropdown, Menu, Space, Typography } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserData } from "types";

import {
  LogoutOutlined,
  ProfileOutlined,
  ProjectOutlined,
} from "@ant-design/icons";

import * as S from "./UserMenu.styles";

interface UserMenuProps {
  currentUser: UserData | null;
  logOut: () => void;
}

const UserMenu = (props: UserMenuProps) => {
  const { currentUser, logOut } = props;

  const history = useHistory();

  const handleLogout = () => {
    logOut();
    localStorage.clear();
    history.push("/login");
  };

  const menu = (
    <Menu>
      <S.MenuItem icon={<S.MenuItemIcon type={ProfileOutlined} />}>
        <Link to="/profile">Profile</Link>
      </S.MenuItem>
      <S.MenuItem icon={<S.MenuItemIcon type={ProjectOutlined} />}>
        <Link to="/projects">Projects</Link>
      </S.MenuItem>
      <S.MenuItem
        icon={<S.MenuItemIcon type={LogoutOutlined} />}
        onClick={handleLogout}
      >
        Logout
      </S.MenuItem>
    </Menu>
  );
  return (
    <Space size="large">
      <S.User>
        {currentUser?.firstName} {currentUser?.lastName}
      </S.User>
      <Dropdown key="more" overlay={menu} trigger={["click"]}>
        <S.ClickableAvatar size={48} src={currentUser?.avatar} />
      </Dropdown>
    </Space>
  );
};

export default UserMenu;
