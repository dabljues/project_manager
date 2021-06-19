import React from "react";
import styled, { css } from "styled-components";
import { Person, GroupWork, ExitToApp } from "@material-ui/icons";
import { Avatar, MenuItem as MI, Typography } from "@material-ui/core";

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
const ProjectsIcon = styled(GroupWork)`
  ${IconStyle}
  color: var(--project-color);
`;
const LogoutIcon = styled(ExitToApp)`
  ${IconStyle}
`;

interface MenuItemProps {
  icon: React.ComponentType;
  text: React.ReactNode | string;
}
const MenuItem = (props: MenuItemProps) => {
  const { icon, text } = props;
  const Icon = icon;
  return (
    <MenuItemWrapper>
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
