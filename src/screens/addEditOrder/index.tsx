import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { FlatList, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AddProductItem } from './components/AddProductItem';
import {
  get as _get,
  uniqueId as _uniqueId,
  isEmpty as _isEmpty,
} from 'lodash';
import { Button, LayoutContainer } from '@components';
import { Order, Product, RootStackParamList } from '@types';
import { ScreenNavigatorKeys, goBack } from '@navigators';
import { icAddCircle } from '@assets';
import { useOrderContext } from '@context';
import styles from './styles';

export const AddEditOrder: React.FunctionComponent<
  NativeStackScreenProps<RootStackParamList, ScreenNavigatorKeys.AddEditOrder>
> = ({ route, navigation }) => {
  const order = route.params?.order;
  const isEdit = route.params?.isEdit;

  const [products, setProducts] = useState<Product[]>([]);
  const [note, setNote] = useState<string>('');
  const { orders, setOrders } = useOrderContext();

  useLayoutEffect(() => {
    if (!order) return;
    navigation.setOptions({
      headerShown: true,
      title: order.id,
      headerBackVisible: true,
      headerBackTitleVisible: false,
    });
  }, [navigation, order]);

  useEffect(() => {
    if (!order) return;
    setProducts(order.products);
    setNote(order.note);
  }, [order]);

  const onAddProductPress = () => {
    const newProduct = {
      id: _uniqueId(),
      name: `New Product ${products.length + 1}`,
      quantity: '1',
    };
    setProducts([...products, newProduct]);
  };

  const onRemoveProduct = (id: string) => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== id),
    );
  };

  const onSubmit = () => {
    const newOrder = {
      id: `Order-${String(orders.length + 1).padStart(4, '0')}`,
      note: note,
      products: products,
    };
    setOrders([...orders, newOrder]);
    setProducts([]);
    setNote('');
  };

  const onEdit = useCallback(() => {
    if (!order) return;
    const { id } = order;
    setOrders((prevOrders: Order[]) =>
      prevOrders.map(orderItem =>
        orderItem.id === id
          ? { ...order, products: products, note: note }
          : orderItem,
      ),
    );
    goBack();
  }, [order, note, products]);

  const onProductChange = useCallback(
    (newProduct: Product) => {
      const { id, name, quantity } = newProduct;
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === id
            ? { ...product, name: name, quantity: quantity }
            : product,
        ),
      );
    },
    [products],
  );

  const isValidOrder = useMemo(() => {
    if (_isEmpty(products)) return false;
    return true;
  }, [products]);
  console.log('HHHHHHH3', isValidOrder);
  return (
    <LayoutContainer disabledSafeView={isEdit}>
      <TextInput
        value={note}
        onChangeText={value => setNote(value)}
        style={styles.noteInput}
        mode="outlined"
        autoFocus={false}
        placeholder="Add note here"
        multiline
      />

      <Button
        icon={icAddCircle}
        mode="outlined"
        type="small"
        onPress={onAddProductPress}>
        Add product
      </Button>

      <FlatList
        keyExtractor={item => item.id}
        data={products}
        style={styles.listContainer}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <AddProductItem
            item={item}
            onProductChange={onProductChange}
            onRemoveProduct={onRemoveProduct}
          />
        )}
      />

      <Button
        style={styles.button}
        disabled={!isValidOrder}
        mode="contained"
        type="small"
        onPress={isEdit ? onEdit : onSubmit}>
        {isEdit ? 'Edit' : 'Submit'}
      </Button>
    </LayoutContainer>
  );
};
