import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "@screens";

export type IconProps = {
  name: string;
  focused?: boolean;
};

const Tab = createBottomTabNavigator();
export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={"HomeTab"}
        component={HomeScreen}
        options={{
          tabBarLabel: "Orders",
        }}
      />
    </Tab.Navigator>
  );
}
