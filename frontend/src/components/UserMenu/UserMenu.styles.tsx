import React from "react";
import styled, { css } from "styled-components";
import { Person, ExitToApp } from "@material-ui/icons";
import { Avatar, MenuItem as MI, Typography } from "@material-ui/core";
import { ProjectIcon } from "models";

const User = styled(Typography)`
  display: none;
  color: snow;
  font-size: 1.5rem;
  @media (min-width: ${(props) => props.theme.breakpoints.values.lg}px) {
    display: block;
  }
`;

const MenuItemWrapper = styled(MI)`
  font-size: 1.125rem;
`;

const IconStyle = css`
  margin-right: 0.5rem;
`;

const ProfileIcon = styled(Person)`
  ${IconStyle}
`;
const ProjectsIcon = styled(ProjectIcon)`
  ${IconStyle}
`;
const LogoutIcon = styled(ExitToApp)`
  ${IconStyle}
`;

interface MenuItemProps {
  icon: React.ComponentType;
  text: React.ReactNode | string;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}
const MenuItem = (props: MenuItemProps) => {
  const { icon, text, onClick } = props;
  const Icon = icon;
  return (
    <MenuItemWrapper onClick={onClick}>
      <Icon />
      {text}
    </MenuItemWrapper>
  );
};

const ClickableAvatar = styled(Avatar)`
  cursor: pointer;
`;

export {
  ClickableAvatar,
  LogoutIcon,
  MenuItem,
  ProfileIcon,
  ProjectsIcon,
  User,
};
