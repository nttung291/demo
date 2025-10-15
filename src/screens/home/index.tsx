import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, LayoutContainer, SearchBar } from "@components";
import { CurrencyFilterType } from "@types";
import { CurrencyList } from "./components/CurrencyList";
import { FilterSelector } from "./components/FilterSelector";
import { ActionBottomSheet } from "./components/ActionBottomSheet";

export const HomeScreen: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isActionVisible, setIsActionVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<CurrencyFilterType>("all");

  const handleActionPress = () => {
    setIsActionVisible(true);
  };

  const handleActionComplete = () => {
    const currentFilter = selectedFilter;
    setSelectedFilter(currentFilter === "all" ? "fiat" : "all");
    setTimeout(() => setSelectedFilter(currentFilter), 100);
  };

  const handleFilterChange = (filter: CurrencyFilterType) => {
    setSelectedFilter(filter);
  };

  return (
    <LayoutContainer>
      <View style={styles.header}>
        <SearchBar
          containerStyle={{ flex: 1 }}
          onChangeText={(text) => setSearchValue(text)}
          value={searchValue}
          onClearPress={() => setSearchValue("")}
        />
        <IconButton icon="dots-vertical" onPress={handleActionPress} />
      </View>

      <FilterSelector
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />

      <CurrencyList search={searchValue} currencyType={selectedFilter} />

      <ActionBottomSheet
        isVisible={isActionVisible}
        onClose={() => setIsActionVisible(false)}
        onActionComplete={handleActionComplete}
      />
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});
