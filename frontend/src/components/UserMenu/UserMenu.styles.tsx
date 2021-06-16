import { Avatar, Menu, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const User = styled(Typography.Text)`
  display: none;
  color: snow;
  font-size: 1.5rem;
  @media (min-width: 1600px) {
    display: block;
  }
`;

const MenuItem = styled(Menu.Item)`
  font-size: 1.125rem;
`;

const MenuItemIcon = ({ type }: { type: React.ComponentType }) => {
  const StyledIcon = styled(type)`
    font-size: 1em;
  `;
  return <StyledIcon />;
};

const ClickableAvatar = styled(Avatar)`
  cursor: pointer;
`;

export { ClickableAvatar, MenuItem, MenuItemIcon, User };
