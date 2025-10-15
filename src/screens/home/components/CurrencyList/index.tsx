import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { MD2Colors as Colors } from "react-native-paper";
import { CurrencyItem } from "./CurrencyItem";
import { ICurrencyInfo, realmService } from "@services";
import { CurrencyFilterType } from "@types";

type Props = {
  search?: string;
  currencyType?: CurrencyFilterType;
};

export const CurrencyList: React.FC<Props> = ({
  search,
  currencyType = "all",
}) => {
  const [currencies, setCurrencies] = useState<ICurrencyInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCurrencies = useCallback(async () => {
    try {
      await realmService.initialize();
      const data = realmService.getCurrencies(currencyType, search);
      setCurrencies(data);
    } catch (error) {
      console.error("Failed to load currencies:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currencyType, search]);

  useEffect(() => {
    loadCurrencies();
  }, [loadCurrencies]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadCurrencies();
  };

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={Colors.purple500} />
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No currencies found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        key={currencyType}
        data={currencies}
        renderItem={({ item }) => <CurrencyItem item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: Colors.grey400,
    fontSize: 16,
  },
  typeIndicator: {
    backgroundColor: Colors.purple50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 4,
  },
  typeText: {
    color: Colors.purple700,
    fontWeight: "500",
  },
  filterIndicator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.purple50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 4,
  },
  filterText: {
    color: Colors.purple700,
    fontWeight: "500",
    fontSize: 14,
  },
  countText: {
    color: Colors.purple500,
    fontSize: 12,
  },
});
