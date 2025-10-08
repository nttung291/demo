import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useGetPokemonDetailQuery } from "../../services/pokemonApi";
import { RootStackParamList } from "../../types/navigation";
import { LayoutContainer } from "@components";
import {
  PokemonHeader,
  PokemonStats,
  PokemonAttributes,
  PokemonAbilities,
  InfoSection,
} from "./components";

type PokemonDetailRouteProp = RouteProp<RootStackParamList, "PokemonDetail">;

export const PokemonDetailScreen: React.FC = () => {
  const route = useRoute<PokemonDetailRouteProp>();
  const { pokemonId } = route.params;

  const {
    data: pokemonData,
    isLoading,
    error,
  } = useGetPokemonDetailQuery(pokemonId);

  return (
    <LayoutContainer isLoading={isLoading} disabledSafeView>
      <ScrollView style={styles.container} testID="pokemon-detail-scroll">
        <PokemonHeader pokemonData={pokemonData} />

        <InfoSection title="Base Stats">
          <PokemonStats stats={pokemonData?.stats} />
        </InfoSection>

        <InfoSection title="Physical Attributes">
          <PokemonAttributes
            height={pokemonData?.height}
            weight={pokemonData?.weight}
            baseExperience={pokemonData?.base_experience}
          />
        </InfoSection>

        <InfoSection title="Abilities">
          <PokemonAbilities abilities={pokemonData?.abilities} />
        </InfoSection>
      </ScrollView>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
