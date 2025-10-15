import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./NavigationUtilities";
import { MainStackScreen } from "./ScreenNavigator";
import { RootStackParamList } from "@types";

type NavigationProps = Partial<
  React.ComponentProps<typeof NavigationContainer>
>;

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer
      // @ts-ignore
      ref={navigationRef}
      {...props}
    >
      <MainStackScreen />
    </NavigationContainer>
  );
};
