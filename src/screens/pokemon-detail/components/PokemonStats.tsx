import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PokemonDetail } from "../../../services/pokemonApi";
import { formatStatName, getStatColor } from "../../../helpers";

type PokemonStatsProps = {
  stats?: PokemonDetail["stats"];
};

export const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <View style={styles.statsContainer} testID="stats-container">
      {stats.map((statInfo, index) => {
        const statName = formatStatName(statInfo.stat.name);
        const statValue = statInfo.base_stat;
        const statPercentage = Math.min(statValue / 150, 1) * 100;

        return (
          <View key={index} style={styles.statRow} testID={`stat-row-${index}`}>
            <Text style={styles.statName}>{statName}</Text>
            <Text style={styles.statValue}>{statValue}</Text>
            <View style={styles.statBarContainer}>
              <View
                style={[
                  styles.statBar,
                  {
                    width: `${statPercentage}%`,
                    backgroundColor: getStatColor(statPercentage),
                  },
                ]}
                testID={`stat-bar-${index}`}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    marginTop: 8,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statName: {
    width: 80,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  statValue: {
    width: 40,
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    textAlign: "right",
    marginRight: 8,
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  statBar: {
    height: "100%",
    borderRadius: 4,
  },
});
