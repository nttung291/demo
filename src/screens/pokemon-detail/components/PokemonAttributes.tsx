import React from "react";
import { View, Text, StyleSheet } from "react-native";

type PokemonAttributesProps = {
  height?: number;
  weight?: number;
  baseExperience?: number;
};

export const PokemonAttributes: React.FC<PokemonAttributesProps> = ({
  height,
  weight,
  baseExperience,
}) => {
  return (
    <View style={styles.attributesContainer} testID="physical-attributes">
      <View style={styles.attributeItem}>
        <Text style={styles.attributeValue}>
          {height ? (height / 10).toFixed(1) : "?"} m
        </Text>
        <Text style={styles.attributeLabel}>Height</Text>
      </View>
      <View style={styles.attributeItem}>
        <Text style={styles.attributeValue}>
          {weight ? (weight / 10).toFixed(1) : "?"} kg
        </Text>
        <Text style={styles.attributeLabel}>Weight</Text>
      </View>
      <View style={styles.attributeItem}>
        <Text style={styles.attributeValue}>{baseExperience || "?"}</Text>
        <Text style={styles.attributeLabel}>Base XP</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  attributesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  attributeItem: {
    alignItems: "center",
  },
  attributeValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  attributeLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
