import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserData } from "types";

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";

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

  return (
    <>
      <Typography>
        {currentUser?.firstName} {currentUser?.lastName}
      </Typography>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar src={currentUser?.avatar} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
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
          onClick={() => {
            setAnchorEl(null);
            history.push("/profile");
          }}
        >
          Profile
        </S.MenuItem>
        <S.MenuItem
          onClick={() => {
            setAnchorEl(null);
            history.push("/projects");
          }}
        >
          Projects
        </S.MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
