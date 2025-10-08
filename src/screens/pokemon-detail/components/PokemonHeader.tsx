import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { PokemonDetail } from "../../../services/pokemonApi";
import { getTypeColor } from "../../../helpers";

type PokemonHeaderProps = {
  pokemonData?: PokemonDetail;
};

export const PokemonHeader: React.FC<PokemonHeaderProps> = ({
  pokemonData,
}) => {
  if (!pokemonData) return null;

  return (
    <View style={styles.header}>
      <Image
        source={{
          uri:
            pokemonData.sprites.other["official-artwork"].front_default ||
            pokemonData.sprites.front_default,
        }}
        style={styles.pokemonImage}
        testID="pokemon-image"
      />
      <Text style={styles.pokemonName} testID="pokemon-name">
        {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
      </Text>
      <Text style={styles.pokemonId} testID="pokemon-id">
        #{pokemonData.id}
      </Text>
      <View style={styles.typesContainer}>
        {pokemonData.types.map((typeInfo, index) => (
          <View
            key={index}
            style={[
              styles.typeTag,
              { backgroundColor: getTypeColor(typeInfo.type.name) },
            ]}
            testID={`pokemon-type-${index}`}
          >
            <Text style={styles.typeText}>{typeInfo.type.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 16,
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
  },
  pokemonId: {
    fontSize: 18,
    color: "#666",
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  typeTag: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  typeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    textTransform: "capitalize",
  },
});
