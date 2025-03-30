import React from "react";
import { View, ViewStyle } from "react-native";
import {
  MD2Colors as Colors,
  Paragraph,
  TextInput,
  TextInputProps,
} from "react-native-paper";

type Props = {
  autoFocus?: boolean;
  onChangeText: (text: string) => void;
  placeholder?: string;
  value: string;
  errorMessage?: string;
  containerStyle?: ViewStyle;
  onSubmitEditing?: () => void;
};

export const Input = ({
  onChangeText,
  placeholder = "",
  value,
  autoFocus = false,
  errorMessage,
  containerStyle,
  ...rest
}: Props & TextInputProps) => {
  return (
    <View style={containerStyle}>
      <TextInput
        mode="outlined"
        autoFocus={autoFocus}
        theme={{
          colors: {
            background: "transparent",
            primary: Colors.green400,
          },
        }}
        textColor={Colors.green400}
        selectionColor={Colors.green400}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.grey400}
        value={value}
        error={!!errorMessage}
        {...rest}
      />
      {errorMessage && (
        <Paragraph style={{ color: Colors.red400 }}>{errorMessage}</Paragraph>
      )}
    </View>
  );
};
