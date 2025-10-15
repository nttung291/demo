import React from "react";
import { View, StyleSheet } from "react-native";
import { Chip } from "@components";
import { CurrencyFilterType } from "@types";

type Props = {
  selectedFilter: CurrencyFilterType;
  onFilterChange: (filter: CurrencyFilterType) => void;
};

export const FilterSelector: React.FC<Props> = ({
  selectedFilter,
  onFilterChange,
}) => {
  const handleFilterSelect = (filter: CurrencyFilterType) => {
    onFilterChange(filter);
  };

  return (
    <View style={styles.filterContainer}>
      <Chip
        label="All"
        selected={selectedFilter === "all"}
        onPress={() => handleFilterSelect("all")}
      />
      <Chip
        label="Fiat"
        selected={selectedFilter === "fiat"}
        onPress={() => handleFilterSelect("fiat")}
      />
      <Chip
        label="Crypto"
        selected={selectedFilter === "crypto"}
        onPress={() => handleFilterSelect("crypto")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
