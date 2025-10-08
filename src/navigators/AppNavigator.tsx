import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./NavigationUtilities";
import { AuthStackScreen, MainStackScreen } from "./ScreenNavigator";
import { RootState, useAppSelector } from "@state";

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.app);

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <MainStackScreen />
    </NavigationContainer>
  );
};
