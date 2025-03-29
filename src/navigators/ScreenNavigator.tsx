import React from "react";
import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { HomeScreen, LoginScreen } from "@screens";
import { RootStackParamList } from "@types";

const defaultOptions: StackNavigationOptions = {
  headerShown: false,
  transitionSpec: {
    open: { animation: "timing", config: { duration: 500 } },
    close: { animation: "timing", config: { duration: 500 } },
  },
  cardStyleInterpolator: ({
    current: { progress },
  }: {
    current: { progress: number };
  }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
};

export const enum ScreenNavigatorKeys {
  Home = "Home",
  Login = "Login",
}

const AppStack = createStackNavigator<RootStackParamList>();

export function MainStackScreen() {
  return (
    <AppStack.Navigator initialRouteName={ScreenNavigatorKeys.Home}>
      <AppStack.Screen
        name={ScreenNavigatorKeys.Home}
        component={HomeScreen}
        options={defaultOptions}
      />
    </AppStack.Navigator>
  );
}

export function AuthStackScreen() {
  return (
    <AppStack.Navigator initialRouteName={ScreenNavigatorKeys.Login}>
      <AppStack.Screen
        name={ScreenNavigatorKeys.Login}
        component={LoginScreen}
        options={defaultOptions}
      />
    </AppStack.Navigator>
  );
}
