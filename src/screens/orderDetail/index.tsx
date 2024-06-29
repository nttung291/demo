import React, { useCallback } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@types';
import { ScreenNavigatorKeys } from '@navigators';

interface Props {}

export const OrderDetail: React.FunctionComponent<
  NativeStackScreenProps<RootStackParamList, ScreenNavigatorKeys.OrderDetail> &
    Props
> = ({ route }) => {
  return <View style={styles.container}></View>;
};
