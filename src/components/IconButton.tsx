import React, { ComponentProps } from "react";
import { View } from "react-native";
import { MD2Colors as Colors } from "react-native-paper";
import { IconButton as PaperIconButton } from "react-native-paper";

export const IconButton = ({
  icon,
  onPress,
  ...props
}: ComponentProps<typeof PaperIconButton>): JSX.Element => {
  return (
    <PaperIconButton
      icon={icon}
      size={24}
      onPress={onPress}
      iconColor={Colors.grey50}
      {...props}
    />
  );
};
