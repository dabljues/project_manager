import { IconInfo } from "types";

const renderIconFromInfo = (iconInfo: IconInfo, additionalProps?: any) => {
  const { Icon, iconProps } = iconInfo;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Icon {...iconProps} {...additionalProps} />;
};

export default renderIconFromInfo;
