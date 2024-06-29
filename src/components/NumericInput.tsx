import React, { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { MD2Colors as Colors, TextInput } from "react-native-paper";
import { icMinus, icPlus } from "@assets";
import { IconButton } from "./IconButton";
import { toString } from "lodash";

export type NumericInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  maxLimit?: number;
  minLimit?: number;
} & Omit<ComponentProps<typeof TextInput>, "maxLimit" | "minLimit">;

export const NumericInput = ({
  value,
  onChangeText,
  maxLimit,
  minLimit = 1,
  ...props
}: NumericInputProps): JSX.Element => {
  const onPlusPress = () => {
    if ((maxLimit && Number(value) >= maxLimit) || isNaN(Number(value))) return;
    if (onChangeText) onChangeText(toString(Number(value) + 1));
  };
  const onMinusPress = () => {
    if ((minLimit && Number(value) <= minLimit) || isNaN(Number(value))) return;
    if (onChangeText) onChangeText(toString(Number(value) - 1));
  };

  const onChange = (text: string) => {
    if (isNaN(Number(value))) onChangeText("1");
    else if (maxLimit && Number(text) >= maxLimit)
      onChangeText(toString(maxLimit));
    else if (minLimit && Number(text) <= minLimit)
      onChangeText(toString(minLimit));
    return onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <IconButton icon={icMinus} size={14} onPress={onMinusPress} />
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
        mode="outlined"
        style={styles.inputContainer}
        {...props}
      />
      <IconButton icon={icPlus} size={14} onPress={onPlusPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    height: 40,
    backgroundColor: Colors.white,
    maxWidth: 48,
    fontSize: 12,
  },
});
