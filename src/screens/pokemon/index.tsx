import React, { useCallback, useState, ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import { PokemonListItem } from "./components/PokemonListItem";
import { useGetPokemonListQuery } from "../../services/pokemonApi";
import { LayoutContainer } from "@components";
import { FlashList } from "@shopify/flash-list";

export const PokemonListScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { data, isLoading } = useGetPokemonListQuery({});
  const pokemons = data?.results || [];

  const onItemPress = (pokemonId: string) => {
    navigation.navigate("PokemonDetail", { pokemonId });
  };

  return (
    <LayoutContainer isLoading={isLoading} disabledSafeView>
      <View style={styles.container}>
        <FlashList
          data={pokemons}
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <PokemonListItem
              item={item}
              index={index}
              onItemPress={onItemPress}
            />
          )}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No Pokemon found</Text>
            </View>
          }
        />
      </View>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
