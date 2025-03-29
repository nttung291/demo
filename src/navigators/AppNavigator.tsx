import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./NavigationUtilities";
import { AuthStackScreen, MainStackScreen } from "./ScreenNavigator";

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AuthStackScreen />
    </NavigationContainer>
  );
};
