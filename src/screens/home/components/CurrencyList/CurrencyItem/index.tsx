import React from "react";
import { View, StyleSheet } from "react-native";
import { MD2Colors as Colors } from "react-native-paper";
import { ICurrencyInfo } from "@services";
import { Paragraph, SParagraph } from "@components";
import _get from "lodash/get";

type Props = {
  item: ICurrencyInfo;
};

export const CurrencyItem: React.FC<Props> = ({ item }) => {
  const isFiat = !!item.code;
  const symbol = (isFiat ? item.code : item.symbol) || "";
  const name = item.name || "";

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Paragraph>{symbol}</Paragraph>
        <SParagraph style={styles.leftSubTitle}>{name}</SParagraph>
      </View>
      <View style={styles.rightContainer}>
        <View
          style={[
            styles.badge,
            { backgroundColor: isFiat ? Colors.blue700 : Colors.purple700 },
          ]}
        >
          <SParagraph style={styles.badgeText}>
            {isFiat ? "Fiat" : "Crypto"}
          </SParagraph>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey800,
  },
  leftContainer: {
    flex: 1,
  },
  leftSubTitle: {
    color: Colors.grey400,
    marginTop: 4,
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
  },
});
