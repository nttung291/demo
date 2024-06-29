import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { IconButton, NumericInput } from '@components';
import { icRemove } from '@assets';
import { Product } from '@types';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

interface AddProductItemProps {
  item: Product;
  onProductChange: (product: Product) => void;
  onRemoveProduct: (id: string) => void;
}
export const AddProductItem = memo(
  ({ item, onProductChange, onRemoveProduct }: AddProductItemProps) => {
    const { id, name, quantity } = item;
    const [productName, setProductName] = useState(name);
    const [productQuantity, setProductQuantity] = useState(quantity);

    const opacity = useSharedValue(1);

    useEffect(() => {
      onProductChange({
        ...item,
        name: productName,
        quantity: productQuantity,
      });
    }, [productName, productQuantity]);

    const onRemove = () => {
      opacity.value = withSpring(0, { duration: 400, velocity: 0.2 });
      setTimeout(() => onRemoveProduct(id), 500);
    };

    return (
      <Animated.View style={{ ...styles.container, opacity: opacity?.value }}>
        <IconButton icon={icRemove} onPress={onRemove} />
        <TextInput
          style={styles.input}
          mode="outlined"
          value={productName}
          onChangeText={text => setProductName(text)}
        />
        <NumericInput
          value={productQuantity}
          onChangeText={value => setProductQuantity(value)}
          minLimit={1}
        />
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1.5,
    height: 44,
    backgroundColor: 'white',
    marginHorizontal: 8,
  },
});
