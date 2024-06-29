import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddEditOrderStackScreen, OrderStackScreen } from './ScreenNavigator';

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
      }}>
      <Tab.Screen
        name={'OrdersTab'}
        component={OrderStackScreen}
        options={{
          tabBarLabel: 'Orders',
        }}
      />
      <Tab.Screen
        name={'AddOrderTab'}
        component={AddEditOrderStackScreen}
        options={{
          tabBarLabel: 'Add New',
        }}
      />
    </Tab.Navigator>
  );
}
