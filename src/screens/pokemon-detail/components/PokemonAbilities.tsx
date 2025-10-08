import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PokemonDetail } from "../../../services/pokemonApi";
import { formatAbilityName } from "../../../helpers";

type PokemonAbilitiesProps = {
  abilities?: PokemonDetail["abilities"];
};

export const PokemonAbilities: React.FC<PokemonAbilitiesProps> = ({
  abilities,
}) => {
  if (!abilities) return null;

  return (
    <View style={styles.abilitiesContainer} testID="abilities-container">
      {abilities.map((abilityInfo, index) => (
        <View key={index} style={styles.abilityItem} testID={`ability-item-${index}`}>
          <Text style={styles.abilityName}>
            {formatAbilityName(abilityInfo.ability.name)}
            {abilityInfo.is_hidden && (
              <Text style={styles.hiddenText}> (Hidden)</Text>
            )}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  abilitiesContainer: {
    marginTop: 8,
  },
  abilityItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  abilityName: {
    fontSize: 16,
    color: "#333",
  },
  hiddenText: {
    fontStyle: "italic",
    color: "#666",
  },
});
