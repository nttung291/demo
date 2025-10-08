import React from "react";
import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { HomeScreen, LoginScreen } from "@screens";
import { RootStackParamList } from "@types";
import { DetailScreen } from "src/screens/detail";
import { PokemonListScreen } from "src/screens/pokemon";
import { PokemonDetailScreen } from "src/screens/pokemon-detail";

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
  Detail = "Detail",
  Login = "Login",
  PokemonList = "PokemonList",
  PokemonDetail = "PokemonDetail",
}

const AppStack = createStackNavigator<RootStackParamList>();

export function MainStackScreen() {
  return (
    <AppStack.Navigator initialRouteName={ScreenNavigatorKeys.PokemonList}>
      <AppStack.Screen
        name={ScreenNavigatorKeys.PokemonList}
        component={PokemonListScreen}
        options={{
          ...defaultOptions,
          headerShown: true,
          headerTitle: "Pokémon",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "700",
          },
        }}
      />
      <AppStack.Screen
        name={ScreenNavigatorKeys.PokemonDetail}
        component={PokemonDetailScreen}
        options={{
          ...defaultOptions,
          headerShown: true,
          headerTitle: "",
          headerBackTitleVisible: false,
        }}
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
