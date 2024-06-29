import React, { ComponentProps } from "react";
import { IconButton as PaperIconButton } from "react-native-paper";

export const IconButton = ({
  icon,
  onPress,
  ...props
}: ComponentProps<typeof PaperIconButton>): JSX.Element => {
  return <PaperIconButton icon={icon} size={20} onPress={onPress} {...props} />;
};
