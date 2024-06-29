import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { H3, IconButton, SParagraph } from "@components";
import { Order } from "@types";
import { isEmpty } from "lodash";
import { MD2Colors as Colors, TextInput } from "react-native-paper";
import { icEdit } from "@assets";

interface OrderItemProps {
  item: Order;
  onPressItem: (order: Order) => void;
}

export const OrderItem = memo(({ item, onPressItem }: OrderItemProps) => {
  const { id, note, products } = item;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <H3>{id}</H3>
        <IconButton icon={icEdit} size={16} onPress={() => onPressItem(item)} />
      </View>
      {!isEmpty(products) &&
        products.map((product) => (
          <SParagraph style={styles.productContainer}>
            {`• ${product.name} - ${product.quantity} ${
              Number(product.quantity) > 1 ? "items" : "item"
            }`}
          </SParagraph>
        ))}
      {note && (
        <TextInput
          label="Note"
          style={styles.noteInput}
          value={note}
          mode="outlined"
          editable={false}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productContainer: {
    marginTop: 6,
    paddingHorizontal: 16,
  },
  noteInput: {
    backgroundColor: Colors.white,
    fontSize: 12,
    marginTop: 16,
  },
});
