import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MD2Colors as Colors } from "react-native-paper";

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export const Chip: React.FC<Props> = ({ label, selected = false, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected ? styles.selectedContainer : styles.unselectedContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.label,
          selected ? styles.selectedLabel : styles.unselectedLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedContainer: {
    backgroundColor: Colors.purple500,
  },
  unselectedContainer: {
    backgroundColor: Colors.grey700,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectedLabel: {
    color: Colors.white,
  },
  unselectedLabel: {
    color: Colors.grey300,
  },
});
