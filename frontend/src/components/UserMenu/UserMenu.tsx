import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserData } from "types";

import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import * as S from "./UserMenu.styles";

interface UserMenuProps {
  currentUser: UserData | null;
  logOut: () => void;
}
const UserMenu = (props: UserMenuProps) => {
  const { currentUser, logOut } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const history = useHistory();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logOut();
    localStorage.clear();
    history.push("/login");
  };

  const menu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={() => setAnchorEl(null)}
    >
      <S.MenuItem
        icon={S.ProfileIcon}
        text="Profile"
        onClick={() => {
          setAnchorEl(null);
          history.push("/profile");
        }}
      />
      <S.MenuItem
        icon={S.ProjectsIcon}
        text="Projects"
        onClick={() => {
          setAnchorEl(null);
          history.push("/projects");
        }}
      />
      <S.MenuItem icon={S.LogoutIcon} text="Logout" onClick={handleLogout} />
    </Menu>
  );

  return (
    <>
      <S.User>
        {currentUser?.firstName} {currentUser?.lastName}
      </S.User>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar src={currentUser?.avatar} />
      </IconButton>
      {menu}
    </>
  );
};

export default UserMenu;
