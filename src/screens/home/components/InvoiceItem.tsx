import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MD2Colors as Colors } from "react-native-paper";
import { InvoiceResponse } from "@types";
import { SParagraph } from "@components";

type Props = {
  item: InvoiceResponse;
};

export const InvoiceItem: React.FC<Props> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <SParagraph>{item?.invoiceNumber}</SParagraph>
      <SParagraph>{`${item?.currencySymbol}${item?.totalAmount} ${item?.currency}`}</SParagraph>
      {item?.customer && (
        <SParagraph>{`${item?.customer.firstName} ${item?.customer.lastName}`}</SParagraph>
      )}
      {item?.description && <SParagraph>{`${item?.description}`}</SParagraph>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: Colors.green400,
    borderRadius: 8,
    padding: 16,
  },
});
