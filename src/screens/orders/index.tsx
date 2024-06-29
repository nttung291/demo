import React from 'react';
import { FlatList, View } from 'react-native';
import { H3, LayoutContainer } from '@components';
import { navigate, ScreenNavigatorKeys } from '@navigators';
import styles from './styles';
import { useOrderContext } from '@context';
import { OrderItem } from './components/OrderItem';
import { Order } from '@types';

export const OrdersScreen: React.FunctionComponent = () => {
  const { orders } = useOrderContext();

  const onItemPress = (item: Order) =>
    navigate(ScreenNavigatorKeys.AddEditOrder, { order: item, isEdit: true });

  return (
    <LayoutContainer>
      <FlatList
        keyExtractor={item => item.id}
        data={orders}
        style={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListEmptyComponent={() => <H3>Empty Orders</H3>}
        renderItem={({ item }) => (
          <OrderItem item={item} onPressItem={onItemPress} />
        )}
      />
    </LayoutContainer>
  );
};
