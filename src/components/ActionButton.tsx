import React from "react";
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Button, MD2Colors as Colors } from "react-native-paper";

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onPress,
  style,
  textStyle,
  variant = "primary",
  disabled = false,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return Colors.grey400;

    switch (variant) {
      case "primary":
        return Colors.purple500;
      case "secondary":
        return Colors.blue500;
      case "danger":
        return Colors.red500;
      default:
        return Colors.purple500;
    }
  };

  return (
    <Button
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style]}
      buttonColor={getBackgroundColor()}
      labelStyle={[styles.buttonText, textStyle]}
    >
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 4,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
