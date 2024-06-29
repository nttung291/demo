import React from "react";
import { View } from "react-native";
import { MD2Colors as Colors } from "react-native-paper";
import { Token } from "@types";
import { Paragraph, SParagraph } from "@components";
import styles from "./styles";
import _get from "lodash/get";
import {
  convertDollarStringToFormattedDollar,
  convertPercentChange,
} from "@helpers";

type Props = {
  item: Token;
};

export const TokenItem: React.FC<Props> = ({ item }) => {
  const symbol = _get(item, "symbol", "");
  const name = _get(item, "name", "");
  const percentChange24h = _get(item, "quote.USD.percent_change_24h");
  const price = _get(item, "quote.USD.price");

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Paragraph>{symbol}</Paragraph>
        <SParagraph style={styles.leftSubTitle}>{name}</SParagraph>
      </View>
      <View style={styles.rightContainer}>
        <Paragraph
          style={[
            styles.rightTitle,
            {
              color: percentChange24h > 0 ? Colors.green400 : Colors.red400,
            },
          ]}
        >
          {convertPercentChange(percentChange24h)}
        </Paragraph>
        <SParagraph style={styles.rightSubTitle}>
          {convertDollarStringToFormattedDollar(price)}
        </SParagraph>
      </View>
    </View>
  );
};
