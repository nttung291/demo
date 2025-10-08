import React, { useMemo } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";

type PokemonItemProps = {
  item: {
    name: string;
    url: string;
  };
  index: number;
  onItemPress: (id: string) => void;
};

export const PokemonListItem: React.FC<PokemonItemProps> = ({
  item,
  index,
  onItemPress,
}) => {
  const pokemonData = useMemo(() => {
    const pokemonId = item.url.split("/").filter(Boolean).pop() || "";
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    return {
      pokemonId,
      imageUrl,
    };
  }, [item]);

  return (
    <TouchableOpacity
      style={styles.pokemonItem}
      onPress={() => onItemPress(pokemonData.pokemonId)}
      testID={`pokemon-item-${index}`}
    >
      <Image
        source={{ uri: pokemonData.imageUrl }}
        style={styles.pokemonImage}
        testID={`pokemon-image-${index}`}
      />
      <View style={styles.pokemonInfo}>
        <Text style={styles.pokemonName} testID={`pokemon-name-${index}`}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text style={styles.pokemonId} testID={`pokemon-id-${index}`}>
          #{pokemonData.pokemonId}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pokemonItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  pokemonImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  pokemonInfo: {
    flex: 1,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  pokemonId: {
    fontSize: 14,
    color: "#666",
  },
});
