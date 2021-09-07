import styled from "styled-components/macro";

import {
  CardHeader,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { IconInfo } from "types";

const EntityIcon = styled.div`
  color: white;
  font-size: 4rem;
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  word-break: break-word;
`;

const Name = styled(Typography)`
  color: white;
  font-size: 1rem;

  @media (min-width: ${(props) => props.theme.breakpoints.values.xxsm}px) {
    font-size: 2rem;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    font-size: 4rem;
  }
`;

const StyledHeader = styled(CardHeader)`
  display: flex;
  background-color: #3f51b5;
  align-items: center;
`;

interface EntityNameProps {
  name: string;
  iconInfo: IconInfo;
}

const EntityName = (props: EntityNameProps) => {
  const { name, iconInfo } = props;
  const { Icon, iconProps } = iconInfo;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  if (matches) {
    return (
      <StyledHeader
        disableTypography
        // eslint-disable-next-line react/jsx-props-no-spreading
        avatar={<EntityIcon as={Icon} {...iconProps} />}
        title={<Name>{name}</Name>}
      />
    );
  }
  return (
    <StyledHeader
      disableTypography
      title={
        <NameWrapper>
          <Name>{name}</Name>
        </NameWrapper>
      }
    />
  );
};

export default EntityName;
