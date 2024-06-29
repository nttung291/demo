import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import { AddEditOrder, OrderDetail, OrdersScreen } from '@screens';
import { RootStackParamList } from '@types';

const defaultOptions: StackNavigationOptions = {
  headerShown: false,
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 500 } },
    close: { animation: 'timing', config: { duration: 500 } },
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
  Orders = 'Orders',
  OrderDetail = 'OrderDetail',
  AddEditOrder = 'AddEditOrder',
}

const AppStack = createStackNavigator<RootStackParamList>();
export function OrderStackScreen() {
  return (
    <AppStack.Navigator initialRouteName={ScreenNavigatorKeys.Orders}>
      <AppStack.Screen
        name={ScreenNavigatorKeys.Orders}
        component={OrdersScreen}
        options={defaultOptions}
      />
      <AppStack.Screen
        name={ScreenNavigatorKeys.OrderDetail}
        component={OrderDetail}
        options={defaultOptions}
      />
      <AppStack.Screen
        name={ScreenNavigatorKeys.AddEditOrder}
        component={AddEditOrder}
        options={defaultOptions}
      />
    </AppStack.Navigator>
  );
}

export function AddEditOrderStackScreen() {
  return (
    <AppStack.Navigator initialRouteName={ScreenNavigatorKeys.AddEditOrder}>
      <AppStack.Screen
        name={ScreenNavigatorKeys.AddEditOrder}
        component={AddEditOrder}
        options={defaultOptions}
      />
    </AppStack.Navigator>
  );
}
