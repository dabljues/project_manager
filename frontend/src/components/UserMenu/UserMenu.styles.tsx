import { Avatar, Menu, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const User = styled(Typography.Text)`
  color: snow;
  font-size: 1.5rem;
`;

const MenuItem = styled(Menu.Item)`
  font-size: 1.125rem;
  padding: 0.8rem;
`;

const MenuItemIcon = ({ type }: { type: React.ComponentType }) => {
  const StyledIcon = styled(type)`
    font-size: 1em;
    margin-right: 0.7em;
  `;
  return <StyledIcon />;
};

const ClickableAvatar = styled(Avatar)`
  cursor: pointer;
`;

export { ClickableAvatar, MenuItem, MenuItemIcon, User };
